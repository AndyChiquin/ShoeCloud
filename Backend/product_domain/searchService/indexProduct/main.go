package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"indexProduct/app/config"
	"indexProduct/app/routes"
	_ "indexProduct/docs"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Index Product API
// @version 1.0
// @description API para indexar productos en MongoDB.
// @host localhost:8006
// @BasePath /

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
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	routes.RegisterIndexRoutes(router)

	log.Printf("🚀 indexProduct running on port %s", port)
	router.Run(":" + port)
}
