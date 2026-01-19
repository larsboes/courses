FROM python:3.9-slim

WORKDIR /app

# Install Flask
RUN pip install flask

# Copy application files
COPY app.py .
COPY static ./static
COPY docs ./docs
COPY openapi.yaml .

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
