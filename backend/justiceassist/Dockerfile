# Use Python 3.9 Slim to save space
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install System Dependencies (Tesseract OCR is required by your code)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the Flask port
EXPOSE 5000

# Command to run the server
CMD ["python", "run.py"]