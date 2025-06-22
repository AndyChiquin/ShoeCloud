# Imagen base de Python
FROM python:3.10

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y código
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Puerto que expondrá el contenedor
EXPOSE 8009

# Comando para correr el microservicio
CMD ["python", "main.py"]
