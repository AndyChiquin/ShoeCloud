package main

import (
	"createRefund/app/config"
	"createRefund/app/routes"
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	// Inicializar la base de datos
	config.InitDB()

	// Registrar rutas
	routes.RegisterRefundRoutes()

	// Leer puerto desde variable de entorno
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	// Levantar servidor
	fmt.Printf("🚀 createRefund service running on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}
