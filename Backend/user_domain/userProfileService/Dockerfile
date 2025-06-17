# Usa imagen oficial de Python
FROM python:3.11-slim

# Establece directorio de trabajo
WORKDIR /app

# Copia archivos al contenedor
COPY . .

# Instala dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto donde corre Flask
EXPOSE 8000

# Comando para ejecutar la app
CMD ["python", "main.py"]
