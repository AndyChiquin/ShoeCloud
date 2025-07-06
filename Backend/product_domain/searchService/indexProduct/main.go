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
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ Could not load .env file, using system variables")
	}

	config.ConnectDB()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8006"
	}

	router := gin.Default()

	routes.RegisterIndexRoutes(router)

	log.Printf("🚀 indexProduct running on port %s", port)
	router.Run(":" + port)
}
