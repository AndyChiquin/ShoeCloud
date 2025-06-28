package controllers

import (
	"net/http"

	"indexProduct/app/services"

	"github.com/gin-gonic/gin"
)

func IndexProduct(c *gin.Context) {
	var product services.ProductInput

	// Validar que venga el JSON con los campos correctos
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Datos inválidos o incompletos",
			"details": err.Error(),
		})
		return
	}

	// Llamar al servicio para guardar el producto
	if err := services.SaveProduct(product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Error al indexar producto",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Producto indexado correctamente",
	})
}
