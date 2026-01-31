from flask import Flask, send_from_directory

webserver = Flask(__name__)

@webserver.route('/')
def home():
    return send_from_directory('root-page', 'index.html')

@webserver.route('/<path:path>')
def static_pages(path):
    return send_from_directory('root-page', path)

if __name__ == '__main__':
    webserver.run(host='0.0.0.0', port=8000)
