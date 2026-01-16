import time
from langchain_ollama import OllamaLLM

llm = OllamaLLM(
	model="qwen2:1.5b",
	base_url="http://eigenfield_ollama:11434",
	temperature=0.4,
	num_predict=800,
	num_ctx=2048,
	top_p=0.95,
	repeat_penalty=1.15,
)


def generate_response(query: str, context_chunks: list):
	"""Generate answer using retrieved chunks"""

	if not context_chunks:
		yield "No information found."
		return

	context = "\n\n".join(
		[
			f"Source: {chunk['source']}\n{chunk['text'][:700]}"
			for chunk in context_chunks[:3]
		]
	)

	prompt = f"""You are an agricultural expert. Answer thoroughly using the context.

Context:
{context}

Question: {query}

Provide a detailed answer with examples and explanations (5-8 sentences):"""

	first_token = True
	token_count = 0

	try:
		for chunk in llm.stream(prompt):
			if chunk:
				if first_token:
					first_token = False

				token_count += 1
				yield chunk

	except Exception as e:
		print(f"LLM Error: {e}")
		yield f"\n[Error: {str(e)}]"
