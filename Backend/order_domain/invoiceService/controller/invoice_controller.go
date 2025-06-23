package controller

import (
	"net/http"
	"strconv"

	"invoiceService/service"

	"github.com/gin-gonic/gin"
)

// Estructura para recibir datos del body
type InvoiceRequest struct {
	OrderID int     `json:"order_id"`
	Total   float64 `json:"total_amount"`
}

// POST /invoice
func CreateInvoiceHandler(c *gin.Context) {
	var req InvoiceRequest

	// Parseo del JSON
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Lógica del servicio
	invoice, err := service.CreateInvoice(req.OrderID, req.Total)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, invoice)
}

// GET /invoice/:id
func GetInvoiceByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var invoice service.InvoiceResponse
	result := service.GetInvoice(uint(id), &invoice)
	if result != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error()})
		return
	}

	c.JSON(http.StatusOK, invoice)
}
