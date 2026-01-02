from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb
from chromadb.utils import embedding_functions
from pypdf import PdfReader

embeddings = embedding_functions.DefaultEmbeddingFunction()

chroma_client = chromadb.PersistentClient(path="/opt/eigen_field/vectordb/")

def process_pdf(file_path: str):
	"""Extract text from PDF"""
	reader = PdfReader(file_path)
	text = ""
	for page in reader.pages:
		text += page.extract_text()
	return text

def chunk_text(text: str):
	"""Split text into chunks"""
	splitter = RecursiveCharacterTextSplitter(
		chunk_size=500,
		chunk_overlap=50,
	)
	return splitter.split_text(text)

def index_document(file_path: str, doc_name: str):
	"""Full pipeline: PDF -> Text Extraction -> Chunking -> Vector DB Ingestion"""

	collection = chroma_client.get_or_create_collection(
		name="agriculture_docs",
		embedding_function=embeddings
	)

	text = process_pdf(file_path)

	chunks = chunk_text(text)

	chunk_ids = [f"{doc_name}_chunk_{i}" for i in range(len(chunks))]
	chunk_metadatas = [{"source": doc_name, "chunk_id": i} for i in range(len(chunks))]

	collection.add(
		ids=chunk_ids,
		documents=chunks,
		metadatas=chunk_metadatas
	)

	return len(chunks)

def delete_document_from_vectordb(doc_name: str):
	"""Remove all chunks from a document"""
	collection = chroma_client.get_collection(name="agriculture_docs")
	collection.delete(where={"source": doc_name})
