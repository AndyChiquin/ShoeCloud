package routes

import (
	"indexProduct/app/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterIndexRoutes(router *gin.Engine) {
	indexGroup := router.Group("/index")
	{
		indexGroup.POST("/", controllers.IndexProduct)
	}

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "indexProduct microservice is running",
		})
	})
}
