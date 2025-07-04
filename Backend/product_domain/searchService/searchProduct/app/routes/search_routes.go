package routes

import (
	"searchProduct/app/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterSearchRoutes(router *gin.Engine) {
	searchGroup := router.Group("/search")
	{
		searchGroup.GET("/", controllers.SearchProduct)
	}

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "searchProduct microservice is running",
		})
	})
}
