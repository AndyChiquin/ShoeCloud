# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código al contenedor
COPY . .

# ✅ Copiamos el archivo de variables de entorno
COPY .env .env

# Expone el puerto del microservicio
EXPOSE 8006

# Comando para iniciar el microservicio
CMD ["node", "src/app.js"]
