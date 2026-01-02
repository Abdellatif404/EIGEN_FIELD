from chromadb.utils import embedding_functions
import chromadb

embeddings = embedding_functions.DefaultEmbeddingFunction()

chroma_client = chromadb.PersistentClient(path="/opt/eigen_field/vectordb")

def search_documents(query: str, top_k: int = 5):
	"""Find most relevant chunks for a query"""

	collection = chroma_client.get_collection(
		name="agriculture_docs",
		embedding_function=embeddings
	)

	results = collection.query(
		query_texts=[query],
		n_results=top_k
	)

	formatted = []
	for i in range(len(results['documents'][0])):
		formatted.append({
			"text": results['documents'][0][i],
			"source": results['metadatas'][0][i]['source'],
			"chunk_id": results['metadatas'][0][i]['chunk_id'],
			"relevance_score": float(results['distances'][0][i])
		})

	return formatted
