package service

import (
	"errors"
	"invoiceService/config"
	"invoiceService/model"
	"time"
)

// Estructura para la respuesta de consulta
type InvoiceResponse struct {
	ID          uint    `json:"id"`
	OrderID     uint    `json:"order_id"`
	InvoiceDate string  `json:"invoice_date"`
	TotalAmount float64 `json:"total_amount"`
	Status      string  `json:"status"`
}

// Función para crear una nueva factura
func CreateInvoice(orderID int, total float64) (*model.Invoice, error) {
	// Validar que la orden exista en orderService vía SOAP
	exists, err := CheckOrderExists(orderID)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, errors.New("order not found in orderService")
	}

	// Crear y guardar la factura
	invoice := &model.Invoice{
		OrderID:     uint(orderID),
		TotalAmount: total,
		Status:      "PENDING",
		InvoiceDate: time.Now(),
	}

	if err := config.DB.Create(invoice).Error; err != nil {
		return nil, err
	}

	return invoice, nil
}

// Función para obtener una factura por ID
func GetInvoice(id uint, out *InvoiceResponse) error {
	var invoice model.Invoice

	if err := config.DB.First(&invoice, id).Error; err != nil {
		return err
	}

	*out = InvoiceResponse{
		ID:          invoice.ID,
		OrderID:     invoice.OrderID,
		InvoiceDate: invoice.InvoiceDate.Format("2006-01-02 15:04:05"),
		TotalAmount: invoice.TotalAmount,
		Status:      invoice.Status,
	}

	return nil
}
