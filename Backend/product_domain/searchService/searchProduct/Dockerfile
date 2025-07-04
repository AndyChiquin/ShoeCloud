# Imagen base de Go
FROM golang:1.20-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o searchProduct main.go

EXPOSE 8006

CMD ["./searchProduct"]
