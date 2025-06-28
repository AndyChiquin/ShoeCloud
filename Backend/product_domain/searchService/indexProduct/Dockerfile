# Imagen base ligera de Go
FROM golang:1.20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del módulo y descargar dependencias
COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Copiar el resto del código
COPY . .

# Compilar el binario
RUN go build -o indexProduct main.go

# Exponer el puerto que usa el microservicio
EXPOSE 8006

# Ejecutar el binario al iniciar el contenedor
CMD ["./indexProduct"]
