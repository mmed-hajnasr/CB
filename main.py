import os
import glob
import PyPDF2
import pandas as pd
import json

current_directory = os.getcwd()

pdf_files = glob.glob(os.path.join(current_directory, 'data/*.pdf'))
csv_files = glob.glob(os.path.join(current_directory, 'data/*.csv'))

def extract_text_from_pdf(pdf_file):
    with open(pdf_file, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)
        text = ""
        for page_num in range(num_pages):
            page = reader.pages[page_num]
            text += page.extract_text()
        context = {}
        for key in reader.metadata:
            if key in ["Author","CreationDate","Title"]:
                context[key]= reader.metadata[key];
        context["source"]= file    
        return (str(context),text)

text_dict = {}
for pdf_file in pdf_files:
    (key,text) = extract_text_from_pdf(pdf_file)
    text_dict[key] = text
for csv_file in csv_files:
    with open(csv_file, 'r', encoding='utf-8') as file:
        text_dict[{"source":csv_file }] = file.read()
    
from langchain_text_splitters import RecursiveCharacterTextSplitter
import re

def remove_newlines_without_uppercase(text):
    # Regular expression to match \n followed by a non-uppercase letter or end of string
    return re.sub(r'\n(?![A-Z])', '', text)

def chunkerize(raw):
    # Convert each item in the list to a string
    converted = [remove_newlines_without_uppercase(str(item)) for item in raw]

    # Join all items with a double newline
    text_to_chunk = "".join(converted)

    # Define the text splitter
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=50,
        separators=[
            "\n\n",
            "\n",
            ".",
            ",",
            "-",
            " ",
        ]
    )

    # Use the text splitter on the combined string
    return text_splitter.split_text(text_to_chunk)

for file_name in text_dict:
    text_dict[file_name] = chunkerize(text_dict[file_name])

open("output.txt", "w").write(str(text_dict))