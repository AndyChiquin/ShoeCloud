package controllers

import (
	"indexProduct/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func IndexProduct(c *gin.Context) {
	var input services.ProductInput

	// Validar JSON con product_id
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Se requiere product_id válido",
			"details": err.Error(),
		})
		return
	}

	// Guardar el producto extraído desde el catalog
	if err := services.SaveProduct(input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "No se pudo indexar el producto",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Producto indexado desde catálogo",
	})
}
