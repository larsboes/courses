FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG NO_PROXY

COPY pyproject.toml .
COPY src/ src/

RUN uv sync

ENTRYPOINT ["uv", "run", "dataloader"]
