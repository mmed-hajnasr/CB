FROM python:3.11.8

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "prompt_resource:app", "--host", "0.0.0.0", "--port", "8000"]