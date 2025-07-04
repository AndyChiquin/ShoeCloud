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
			"error":   "The query parameter is missing'",
			"details": "$regex you need a text string",
		})
		return
	}

	results, err := services.PerformSearch(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Search failed",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"results": results})
}
