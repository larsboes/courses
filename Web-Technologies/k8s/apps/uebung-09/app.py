from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_url_path='', static_folder='static')

# In-memory storage for playlists
# Structure: { "playlist_name": [ { "title": "...", "link": "...", "duration": "..." }, ... ] }
playlists = {}

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

# Serve documentation from docs/ folder
@app.route('/docs/')
@app.route('/docs/<path:filename>')
def serve_docs(filename='index.html'):
    return send_from_directory('docs', filename)

# Convenience routes for documentation pages at root level
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
    return jsonify(playlists)

@app.route('/api/playlists', methods=['POST'])
def create_playlist():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({"error": "Playlist name is required"}), 400
    
    name = data['name']
    if name in playlists:
        return jsonify({"error": "Playlist already exists"}), 409
    
    playlists[name] = []
    return jsonify({"message": f"Playlist '{name}' created", "name": name}), 201

@app.route('/api/playlists/<name>', methods=['GET'])
def get_playlist(name):
    if name not in playlists:
        return jsonify({"error": "Playlist not found"}), 404
    return jsonify(playlists[name])

@app.route('/api/playlists/<name>', methods=['PUT'])
def update_playlist(name):
    if name not in playlists:
        return jsonify({"error": "Playlist not found"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400
    
    if isinstance(data, list):
        playlists[name] = data
        return jsonify({"message": f"Playlist '{name}' updated", "tracks": playlists[name]})
    elif 'tracks' in data:
        playlists[name] = data['tracks']
        return jsonify({"message": f"Playlist '{name}' updated", "tracks": playlists[name]})
    else:
        return jsonify({"error": "Expected a list of tracks or {'tracks': [...]}"}), 400

@app.route('/api/playlists/<name>', methods=['DELETE'])
def delete_playlist(name):
    if name in playlists:
        del playlists[name]
        return jsonify({"message": f"Playlist '{name}' deleted"})
    return jsonify({"error": "Playlist not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
