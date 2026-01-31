FROM python:3.9-slim

WORKDIR /app

# Proxy settings for corporate networks
ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG NO_PROXY
ENV HTTP_PROXY=${HTTP_PROXY}
ENV HTTPS_PROXY=${HTTPS_PROXY}
ENV NO_PROXY=${NO_PROXY}

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
