# Use Python 3.9 Slim
FROM python:3.9-slim

# Set environment variables to prevent python from buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install System Dependencies
# libgl1 is for computer vision libraries, tesseract is for OCR
RUN apt-get update && apt-get install -y \
    build-essential \
    tesseract-ocr \
    tesseract-ocr-eng \
    libtesseract-dev \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create necessary directories
RUN mkdir -p /app/uploads /app/instance

# Copy the application code
COPY . .

# Expose the Flask port
EXPOSE 5000

# (The CMD is handled by docker-compose)