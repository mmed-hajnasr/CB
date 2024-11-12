from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

embedding_function = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma(collection_name="pdf_collection",persist_directory="chroma_storage", embedding_function=embedding_function)

results = db.similarity_search_with_relevance_scores("quel est le Nom du Directeur",k=5)

print(results)

