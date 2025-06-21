# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar cache)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código al contenedor
COPY . .

# Exponemos el puerto (asegúrate que coincide con tu .env)
EXPOSE 8008

# Comando para ejecutar la app
CMD ["node", "src/app.js"]
