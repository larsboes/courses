FROM python:3.12-slim

WORKDIR /app

# Copy only the site-packages from the pre-built venv
COPY .venv/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages/

# Copy source code
COPY src/ src/

# Create data directory
RUN mkdir -p /app/data

# Add src to Python path so exam_trainer_api is importable
ENV PYTHONPATH="/app/src:$PYTHONPATH"

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "exam_trainer_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
