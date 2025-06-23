# Imagen base
FROM golang:1.21

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Construir binario
RUN go build -o main .

# Puerto expuesto (ajústalo si cambias en main.go)
EXPOSE 8009

# Comando de arranque
CMD ["./main"]
