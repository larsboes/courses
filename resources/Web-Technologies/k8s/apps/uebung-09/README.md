# Exercise 9: Meta Playlists - REST API & Docker

A web application for managing playlists from various streaming services, built with Python Flask and containerized with Docker.

## 🚀 Quick Start

```bash
# Build the Docker image
docker build -t meta-playlists .

# Run the container
docker run -d -p 5001:5000 --name meta-playlists-test meta-playlists

# Open in browser
open http://localhost:5001
```

## 📁 Project Structure

```
Uebung_9/
├── app.py              # Flask backend with REST API
├── Dockerfile          # Container definition
├── openapi.yaml        # API specification (OpenAPI 3.0)
├── README.md           # This file
├── static/             # Frontend assets
│   ├── index.html      # Main app page
│   ├── style.css       # Styling
│   └── script.js       # Client-side logic
└── docs/               # Documentation
    ├── explanation.html
    ├── architecture.html
    └── openapi.html
```

## 🔗 URLs (when running)

| Page | URL |
|------|-----|
| **App** | http://localhost:5001 |
| **Explanation** | http://localhost:5001/explanation.html |
| **Architecture** | http://localhost:5001/architecture.html |
| **API Docs** | http://localhost:5001/openapi.html |
| **OpenAPI Spec** | http://localhost:5001/openapi.yaml |

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/playlists` | List all playlists |
| POST | `/api/playlists` | Create playlist |
| GET | `/api/playlists/{name}` | Get playlist |
| PUT | `/api/playlists/{name}` | Update playlist |
| DELETE | `/api/playlists/{name}` | Delete playlist |

## 🧪 Testing the API

```bash
# Create a playlist
curl -X POST http://localhost:5001/api/playlists \
  -H "Content-Type: application/json" \
  -d '{"name": "My Playlist"}'

# Add tracks
curl -X PUT http://localhost:5001/api/playlists/My%20Playlist \
  -H "Content-Type: application/json" \
  -d '[{"title": "Song", "link": "https://...", "duration": "3:00"}]'

# Get all playlists
curl http://localhost:5001/api/playlists
```

## 🐳 Docker Commands

```bash
# Stop container
docker stop meta-playlists-test

# Remove container
docker rm meta-playlists-test

# View logs
docker logs meta-playlists-test

# Rebuild after changes
docker build -t meta-playlists . && \
docker rm -f meta-playlists-test && \
docker run -d -p 5001:5000 --name meta-playlists-test meta-playlists
```

## 📚 Key Concepts Covered

- **REST API** - CRUD operations via HTTP methods
- **Flask** - Python web framework
- **Docker** - Containerization
- **OpenAPI** - API specification standard
- **Client-Server Architecture** - Separation of frontend and backend
