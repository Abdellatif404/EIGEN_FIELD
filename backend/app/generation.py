from langchain_ollama import OllamaLLM

llm = OllamaLLM(
	model="llama3.2:3b",
	base_url="http://ollama:11434",
	temperature=0.3
)

def generate_response(query: str, context_chunks: list):
	"""Generate answer using retrieved chunks"""

	context = "\n\n".join([
		f"[Source: {chunk['source']}]\n{chunk['text']}"
		for chunk in context_chunks
	])

	prompt = f"""You are an agricultural knowledge assistant. Answer the question using ONLY the provided context.

Context:
{context}

Question: {query}

Instructions:
- Answer clearly and concisely
- Cite sources by filename when making claims
- If context doesn't contain the answer, say "I don't have enough information in the provided documents"
- Keep your answer under 200 words

Answer:"""

	response = llm.invoke(prompt)

	return response
