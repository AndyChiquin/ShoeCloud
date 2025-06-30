FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8009

# Cambiar al subdirectorio donde está el main.py
CMD ["python", "app/main.py"]
