package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"searchProduct/app/config"
	"searchProduct/app/routes"
)

func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ No se pudo cargar el archivo .env, usando variables del sistema")
	}

	// Conectar a MongoDB
	config.ConnectDB()

	// Iniciar servidor Gin
	port := os.Getenv("PORT")
	if port == "" {
		port = "8006"
	}

	router := gin.Default()

	// Cargar rutas
	routes.RegisterSearchRoutes(router)

	log.Printf("🚀 Servidor escuchando en el puerto %s", port)
	router.Run(":" + port)
}

//test
