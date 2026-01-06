FROM python:3.11-slim AS builder

WORKDIR /opt/build

RUN apt-get update && apt-get install -y --no-install-recommends \
	gcc \
	g++ \
	&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /opt/wheels -r requirements.txt
	
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
	PYTHONDONTWRITEBYTECODE=1 \
	PIP_NO_CACHE_DIR=1 \
	PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /opt/eigen_field/app

COPY --from=builder /opt/wheels /wheels
COPY requirements.txt .

RUN pip install --no-cache /wheels/*

COPY app/ .

EXPOSE 9000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000", "--reload"]
