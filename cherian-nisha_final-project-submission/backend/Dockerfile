FROM python:3.9.18-alpine3.18
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev
RUN mkdir -p /app
COPY requirements.txt /app
RUN pip install -r /app/requirements.txt
COPY src /app
WORKDIR /app
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]