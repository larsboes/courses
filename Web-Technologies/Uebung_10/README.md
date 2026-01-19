# Übung 10: CouchDB Integration

## Setup & Usage
1. **Start the environment**:
   ```bash
   docker-compose up --build
   ```
2. **Access the Application**:
   - Web Interface: [http://localhost:8001](http://localhost:8001)
   - CouchDB Admin (Fauxton): [http://localhost:5984/_utils](http://localhost:5984/_utils) (User: `admin`, Password: `password`)

## Implementation Details
- **CouchDB**: Added as a service in `docker-compose.yml`.
- **Flask App**: Updated `app.py` to use `couchdb` library for persistence.
- **Persistence**: Data is stored in `./dbdata` (mapped volume).

## Answers to Questions

### a. Wie genau findet sich hier das Microservice-Konzept umgesetzt?
Das Microservice-Konzept wird durch die Aufteilung der Anwendung in zwei unabhängige, lose gekoppelte Dienste umgesetzt:
1.  **Webserver (Flask)**: Beinhaltet die Anwendungslogik und stellt das Frontend bereit.
2.  **Datenbank (CouchDB)**: Verantwortlich für die Datenhaltung.

Beide Dienste laufen in eigenen Containern und kommunizieren ausschließlich über eine definierte Netzwerkschnittstelle (HTTP/REST). Dies ermöglicht eine unabhängige Entwicklung, Skalierung und Wartung der Komponenten.

### b. Welches wichtige Element läuft im CouchDB-Container neben der Datenbank selbst?
Neben der eigentlichen Datenbank-Engine läuft im CouchDB-Container ein **HTTP-Server**, der die **REST-API** bereitstellt. CouchDB ist "Web-native", d.h. alle Interaktionen (CRUD-Operationen, Konfiguration) laufen über HTTP. Zusätzlich wird oft das Web-Interface **Fauxton** mit ausgeliefert, das ebenfalls über diesen HTTP-Server erreichbar ist.

### c. Wie sieht die Architektur aus, welche Komponenten gibt es, über welche Schnittstellen kommunizieren die?
**Architektur**: 3-Schichten-Architektur (Presentation, Logic, Data) in einer containerisierten Umgebung.

**Komponenten & Schnittstellen**:
1.  **Client (Browser)**
    - Kommuniziert mit **Webserver** über **HTTP (Port 8001)**.
    - Ruft statische Dateien (HTML/JS) und API-Endpunkte (`/api/playlists`) ab.
2.  **Webserver (Flask-Container)**
    - Verarbeitet Client-Anfragen.
    - Kommuniziert mit **CouchDB** über **HTTP (Port 5984)**.
    - Nutzt die CouchDB REST API (via `couchdb` Python-Library) zum Speichern/Laden von JSON-Dokumenten.
3.  **Datenbank (CouchDB-Container)**
    - Speichert die Daten persistent auf dem Volume `./dbdata`.
    - Antwortet auf HTTP-Anfragen vom Webserver.
