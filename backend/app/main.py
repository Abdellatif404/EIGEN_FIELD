from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
import os
from ingestion import index_document, delete_document_from_vectordb
from retrieval import search_documents
from generation import generate_response

app = FastAPI(title="EIGEN FIELD RAG Agriculture API")

UPLOAD_DIR = "/opt/eigen_field/data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def root():
	return {"message": "RAG Agriculture API"}

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
	"""Upload and index a PDF"""

	if not file.filename.endswith('.pdf'):
		raise HTTPException(status_code=400, detail="Only PDF files are supported.")

	try:
		file_path = os.path.join(UPLOAD_DIR, file.filename)
		with open(file_path, "wb") as buffer:
			shutil.copyfileobj(file.file, buffer)

		num_chunks = index_document(file_path, file.filename)

		return {
			"status": "success",
			"filename": file.filename,
			"chunks_created": num_chunks
		}
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))
	
@app.get("/documents")
async def list_documents():
	"""List all uploaded documents"""
	try:
		files = [f for f in os.listdir(UPLOAD_DIR) if f.endswith('.pdf')]
		return {
			"status": "success",
			"count": len(files),
			"documents": files
		}
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@app.post("/search")
async def search(query: str, top_k: int = 5):
	"""Search for relevant chunks"""
	try:
		results = search_documents(query, top_k)
		return {
			"status": "success",
			"query": query,
			"count": len(results),
			"results": results
		}
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@app.delete("/documents/{doc_name}")
async def delete_document(doc_name: str):
	"""Delete a document and its vectors"""
	try:
		file_path = os.path.join(UPLOAD_DIR, doc_name)
		if not os.path.exists(file_path):
			raise HTTPException(status_code=404, detail="Document not found.")

		os.remove(file_path)
		delete_document_from_vectordb(doc_name)

		return {
			"status": "success",
			"message": f"Document '{doc_name}' deleted successfully."
		}
	except HTTPException:
		raise
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))
	
@app.post("/chat")
async def chat(query: str, top_k: int = 5):
	"""Full RAG pipeline: retrieve context and generate answer"""

	try:
		chunks = search_documents(query, top_k)

		if not chunks:
			return {
				"status": "success",
				"query": query,
				"answer": "No relevant documents found.",
				"sources": [],
				"retrieved_chunks": 0
			}
		
		answer = generate_response(query, chunks)

		sources = list(set([chunk['source'] for chunk in chunks]))

		return {
			"status": "success",
			"query": query,
			"answer": answer,
			"sources": sources,
			"retrieved_chunks": len(chunks)
		}
	
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))
