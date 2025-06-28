package controllers

import (
	"net/http"

	"searchProduct/app/services"

	"github.com/gin-gonic/gin"
)

func SearchProduct(c *gin.Context) {
	query := c.Query("query")

	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Falta el parámetro 'query'",
			"details": "$regex necesita una cadena de texto",
		})
		return
	}

	results, err := services.PerformSearch(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Fallo la búsqueda",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"results": results})
}
