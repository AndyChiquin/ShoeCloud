package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"searchProduct/app/routes"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func SetupTestRouter() *gin.Engine {
	router := gin.Default()
	routes.RegisterSearchRoutes(router)
	return router
}

func TestHealthCheck(t *testing.T) {
	router := SetupTestRouter()

	req, _ := http.NewRequest("GET", "/health", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "searchProduct microservice is running")
}
