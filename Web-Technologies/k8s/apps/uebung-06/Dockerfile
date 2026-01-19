FROM python:3.9.20-slim

RUN pip install flask
RUN mkdir /server
COPY ./webserver.py /server
COPY ./root-page /server/root-page
WORKDIR /server

CMD ["python", "webserver.py"]
