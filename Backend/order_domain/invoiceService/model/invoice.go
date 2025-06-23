package model

import (
	"time"
)

type Invoice struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	OrderID     uint      `json:"order_id"`
	InvoiceDate time.Time `gorm:"autoCreateTime" json:"invoice_date"`
	TotalAmount float64   `json:"total_amount"`
	Status      string    `json:"status"`
}
