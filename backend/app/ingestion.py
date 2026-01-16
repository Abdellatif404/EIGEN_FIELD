import re
import fitz
import chromadb
import warnings
import unicodedata
from chromadb.utils import embedding_functions
from langchain_text_splitters import RecursiveCharacterTextSplitter

warnings.filterwarnings("ignore", category=UserWarning, module="pypdf")

embeddings = embedding_functions.DefaultEmbeddingFunction()
chroma_client = chromadb.PersistentClient(path="/opt/eigen_field/vectordb/")

collection = chroma_client.get_or_create_collection(
	name="agriculture_docs", embedding_function=embeddings
)


def clean_text(text: str) -> str:
	"""Clean extracted text"""
	if not text:
		return ""

	text = unicodedata.normalize("NFKC", text)
	text = re.sub(r"(\w+)-\s*\n\s*(\w+)", r"\1\2", text)
	text = re.sub(r"[ \t]+", " ", text)
	text = re.sub(r"Page \d+(?:/\d+)?", "", text, flags=re.IGNORECASE)
	text = re.sub(r"\n\s*\n+", "\n\n", text)

	return text.strip()


def process_pdf(file_path: str):
	"""Extract and clean text from PDF"""
	try:
		doc = fitz.open(file_path)
		full_text = []
		for page in doc:
			blocks = page.get_text("blocks")
			blocks.sort(key=lambda b: (b[1], b[0]))
			page_text = "\n".join([b[4] for b in blocks])
			full_text.append(page_text)

		text = "\n\n".join(full_text)
		if not text.strip():
			raise ValueError("No text could be extracted")
		return clean_text(text)
	except Exception as e:
		print(f"Error processing PDF: {e}")
		raise


def chunk_text(text: str):
	"""Split text into chunks"""
	if not text or not text.strip():
		return []

	splitter = RecursiveCharacterTextSplitter(
		chunk_size=1500,
		chunk_overlap=250,
		length_function=len,
		separators=["\n\n", "\n", ". ", " ", "", "! ", "? "],
	)
	chunks = splitter.split_text(text)

	filtered_chunks = [chunk for chunk in chunks if len(chunk.strip()) >= 100]

	return list(dict.fromkeys(filtered_chunks))


def index_document(file_path: str, doc_name: str, unique_id: str):
	"""Extract, chunk, and index a document"""
	text = process_pdf(file_path)
	chunks = chunk_text(text)

	chunks = [c.strip() for c in chunks if len(c.strip()) > 20]

	if not chunks:
		raise ValueError("No chunks created")

	BATCH_SIZE = 100

	for i in range(0, len(chunks), BATCH_SIZE):
		batch = chunks[i : i + BATCH_SIZE]
		batch_ids = [f"{unique_id}_ch_{j}" for j in range(i, i + len(batch))]
		batch_metadata = [
			{"source": doc_name, "file_id": unique_id, "chunk_index": j}
			for j in range(i, i + len(batch))
		]

		collection.add(ids=batch_ids, documents=batch, metadatas=batch_metadata)
	return len(chunks)


def delete_document_from_vectordb(doc_id: str):
	"""Remove all chunks from a document"""
	try:
		collection.delete(where={"file_id": doc_id})
		print(f"Deleted all chunks for {doc_id}")
	except Exception as e:
		print(f"Failed to delete {doc_id}: {e}")
		raise
