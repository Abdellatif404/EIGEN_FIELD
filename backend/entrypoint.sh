#!/usr/bin/env bash

set -e

echo "Starting Ollama server..."

ollama serve &
OLLAMA_PID=$!

echo "Waiting for Ollama server to be ready..."

COUNTER=0
MAX_WAIT=60
until ollama list >/dev/null 2>&1; do
	sleep 1
	COUNTER=$((COUNTER + 1))
	if [ $COUNTER -ge $MAX_WAIT ]; then
		echo "ERROR: Ollama failed to start after ${MAX_WAIT}s"
		exit 1
	fi
done

echo "Ollama server is ready."

echo "Pulling qwen2:1.5b model..."
ollama pull qwen2:1.5b
echo "Model pulled successfully."

echo "Preloading model into memory..."
ollama run qwen2:1.5b "Hello" >/dev/null 2>&1
echo "Model preloaded successfully."

kill $OLLAMA_PID
exec ollama serve
