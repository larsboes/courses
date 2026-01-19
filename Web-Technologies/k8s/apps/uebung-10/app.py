from flask import Flask, request, jsonify, send_from_directory
import os
import couchdb
import time

app = Flask(__name__, static_url_path='', static_folder='static')

# CouchDB Connection
COUCHDB_URL = os.environ.get('COUCHDB_URL', 'http://admin:password@localhost:5984')
DB_NAME = 'playlists'

def get_db():
    retries = 5
    while retries > 0:
        try:
            couch = couchdb.Server(COUCHDB_URL)
            if DB_NAME in couch:
                return couch[DB_NAME]
            else:
                return couch.create(DB_NAME)
        except Exception as e:
            print(f"Waiting for CouchDB... ({e})")
            time.sleep(2)
            retries -= 1
    raise Exception("Could not connect to CouchDB")

# Initialize DB connection lazy or on startup? 
# Better on request or ensure it's ready. 
# For simplicity, we'll try to get it on startup, but it might fail if container is not ready.
# So we will get it inside routes or use a global that we try to init.
db = None

# Database initialization is handled lazily in routes

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

# Serve documentation from docs/ folder
@app.route('/docs/')
@app.route('/docs/<path:filename>')
def serve_docs(filename='index.html'):
    return send_from_directory('docs', filename)

@app.route('/explanation.html')
def explanation():
    return send_from_directory('docs', 'explanation.html')

@app.route('/architecture.html')
def architecture():
    return send_from_directory('docs', 'architecture.html')

@app.route('/openapi.html')
def openapi_docs():
    return send_from_directory('docs', 'openapi.html')

@app.route('/api/playlists', methods=['GET'])
def get_playlists():
    global db
    if db is None: db = get_db()
    
    all_playlists = {}
    # Iterate over all documents in the database
    for doc_id in db:
        doc = db[doc_id]
        if 'tracks' in doc:
            all_playlists[doc_id] = doc['tracks']
    return jsonify(all_playlists)

@app.route('/api/playlists', methods=['POST'])
def create_playlist():
    global db
    if db is None: db = get_db()

    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({"error": "Playlist name is required"}), 400
    
    name = data['name']
    if name in db:
        return jsonify({"error": "Playlist already exists"}), 409
    
    # Create new document
    db[name] = {'tracks': []}
    return jsonify({"message": f"Playlist '{name}' created", "name": name}), 201

@app.route('/api/playlists/<name>', methods=['GET'])
def get_playlist(name):
    global db
    if db is None: db = get_db()

    if name not in db:
        return jsonify({"error": "Playlist not found"}), 404
    
    doc = db[name]
    return jsonify(doc.get('tracks', []))

@app.route('/api/playlists/<name>', methods=['PUT'])
def update_playlist(name):
    global db
    if db is None: db = get_db()

    if name not in db:
        return jsonify({"error": "Playlist not found"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400
    
    doc = db[name]
    
    if isinstance(data, list):
        doc['tracks'] = data
    elif 'tracks' in data:
        doc['tracks'] = data['tracks']
    else:
        return jsonify({"error": "Expected a list of tracks or {'tracks': [...]}"}), 400
    
    db.save(doc)
    return jsonify({"message": f"Playlist '{name}' updated", "tracks": doc['tracks']})

@app.route('/api/playlists/<name>', methods=['DELETE'])
def delete_playlist(name):
    global db
    if db is None: db = get_db()

    if name in db:
        del db[name]
        return jsonify({"message": f"Playlist '{name}' deleted"})
    return jsonify({"error": "Playlist not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
