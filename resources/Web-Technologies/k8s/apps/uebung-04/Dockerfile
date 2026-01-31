FROM python:3.9.20-slim

RUN pip install flask
RUN mkdir /server
ADD webserver.py /server
WORKDIR /server

CMD ["python", "webserver.py"]
