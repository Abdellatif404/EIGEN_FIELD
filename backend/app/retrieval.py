import chromadb
from chromadb.utils import embedding_functions

embeddings = embedding_functions.DefaultEmbeddingFunction()
chroma_client = chromadb.PersistentClient(path="/opt/eigen_field/vectordb")

_collection_cache = None


def get_collection():
	"""Get cached collection"""
	global _collection_cache
	if _collection_cache is None:
		_collection_cache = chroma_client.get_collection(
			name="agriculture_docs", embedding_function=embeddings
		)
	return _collection_cache


def search_documents(query: str, top_k: int = 3):
	"""Search for relevant document chunks"""
	collection = get_collection()

	results = collection.query(
		query_texts=[query],
		n_results=min(top_k, 3),
		include=["documents", "metadatas", "distances"],
	)

	formatted = []
	if results["documents"] and results["documents"][0]:
		docs = results["documents"][0]
		metadatas = results["metadatas"][0] if results["metadatas"] else []
		distances = results["distances"][0] if results["distances"] else []

		for i in range(len(docs)):
			metadata = metadatas[i] if i < len(metadatas) else {}

			doc_text = docs[i][:800]

			formatted.append(
				{
					"text": doc_text,
					"source": metadata.get("source", "Unknown"),
					"file_id": metadata.get("file_id", f"chunk_{i}"),
					"relevance_score": (
						float(distances[i]) if i < len(distances) else 0.0
					),
				}
			)

	return formatted
