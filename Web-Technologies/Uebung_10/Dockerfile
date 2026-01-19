FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application files
COPY app.py .
COPY static ./static
COPY docs ./docs
COPY openapi.yaml .
COPY Meta_Playlist_API.json .

# Expose port
EXPOSE 8001

# Run the application
CMD ["python", "app.py"]
