from flask import Flask

webserver = Flask(__name__)

@webserver.route('/')
def home():
    return '<h1>Willkommen auf der minimalen WTA-Homepage!</h1>'

if __name__ == '__main__':
    webserver.run(host='0.0.0.0', port=8000)
