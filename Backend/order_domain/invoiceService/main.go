package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"invoiceService/config"
	"invoiceService/controller"
)

func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	// Inicializar base de datos
	config.InitDB()

	// Crear router
	router := gin.Default()

	// Definir rutas
	router.POST("/invoice", controller.CreateInvoiceHandler)
	router.GET("/invoice/:id", controller.GetInvoiceByID)

	// Puerto por defecto
	port := os.Getenv("PORT")
	if port == "" {
		port = "8009"
	}

	// Iniciar servidor
	fmt.Println("✅ invoiceService running on port", port)
	router.Run(":" + port)
}
