import os
import glob
import PyPDF2
import re
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema import Document
from langchain_chroma import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter


PERSISIST_DIRECTORY = "./chroma_storage"

if not os.path.exists(PERSISIST_DIRECTORY):
    os.makedirs(PERSISIST_DIRECTORY)


embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vectorstore = Chroma(
    collection_name="pdf_collection",
    embedding_function=embedding_model,
    persist_directory=PERSISIST_DIRECTORY
)


def sanitize_filename(filename):
    return re.sub(r'[<>:"/\\|?*]', '_', filename)

def extract_text_from_pdf(pdf_file):
    with open(pdf_file, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)
        text = ""
        for page_num in range(num_pages):
            page = reader.pages[page_num]
            text += page.extract_text()
        extracted_metadata = {
            'Author': reader.metadata.get('/Author', 'Unknown'),
            'Title': reader.metadata.get('/Title', 'Untitled'),
            'CreationDate': reader.metadata.get('/CreationDate', 'Unknown'),
            'ModDate': reader.metadata.get('/ModDate', 'Unknown'),
            'Source': pdf_file
        }
    return text, extracted_metadata


def get_chunks(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50, separators=["\n\n", "\n", ".", ",", "-"])
    return splitter.split_text(text)

current_directory = os.getcwd()
pdf_files = glob.glob(os.path.join(current_directory, 'raw_data', '*.pdf'))
csv_files = glob.glob(os.path.join(current_directory, 'raw_data', '*.csv'))

for pdf_file in pdf_files:
    text, metadata = extract_text_from_pdf(pdf_file)
    if not text.strip():
        print(f"No text extracted from {pdf_file}")
        continue
    print(f"Extracted text from {pdf_file}: {text[:100]}...")  
    chunks = get_chunks(text)
    if not chunks:
        print(f"No chunks created from {pdf_file}")
        continue

    documents = [Document(page_content=chunk, metadata=metadata) for chunk in chunks]
    print(f"Created {len(documents)} documents from {pdf_file}")
    try:
        vectorstore.add_documents(documents)
        print(f"Added {len(documents)} documents from {pdf_file} to the vector store")
    except Exception as e:
        print(f"Error adding documents from {pdf_file} to the vector store: {e}")

for csv_file in csv_files:
    with open(csv_file, 'r') as file:
        text = file.read()
    if not text.strip():
        print(f"No text extracted from {csv_file}")
        continue
    print(f"Extracted text from {csv_file}: {text[:100]}...")  
    chunks = get_chunks(text)
    if not chunks:
        print(f"No chunks created from {csv_file}")
        continue

    documents = [Document(page_content=chunk, metadata={'Source': csv_file}) for chunk in chunks]
    print(f"Created {len(documents)} documents from {csv_file}")
    try:
        vectorstore.add_documents(documents)
        print(f"Added {len(documents)} documents from {csv_file} to the vector store")
    except Exception as e:
        print(f"Error adding documents from {csv_file} to the vector store: {e}")
