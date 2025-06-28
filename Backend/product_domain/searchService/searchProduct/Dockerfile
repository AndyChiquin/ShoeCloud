# Imagen base de Go
FROM golang:1.20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

# Compilar el binario
RUN go build -o searchProduct main.go

# Exponer el puerto
EXPOSE 8006

# Comando por defecto
CMD ["./searchProduct"]
