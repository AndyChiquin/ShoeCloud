package controllers

import (
	"indexProduct/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func IndexProduct(c *gin.Context) {
	var input services.ProductInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Valid product_id is required",
			"details": err.Error(),
		})
		return
	}

	if err := services.SaveProduct(input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Product could not be indexed",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Product indexed from catalog",
	})
}
