package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"indexProduct/app/config"
	"indexProduct/app/routes"
)

func main() {
	// Cargar .env
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ No se pudo cargar el archivo .env, usando variables del sistema")
	}

	// Conectar a Mongo
	config.ConnectDB()

	// Puerto por defecto
	port := os.Getenv("PORT")
	if port == "" {
		port = "8006"
	}

	router := gin.Default()

	// Registrar rutas
	routes.RegisterIndexRoutes(router)

	log.Printf("🚀 indexProduct corriendo en el puerto %s", port)
	router.Run(":" + port)
}

//test
