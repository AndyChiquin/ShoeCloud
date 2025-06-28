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
}
