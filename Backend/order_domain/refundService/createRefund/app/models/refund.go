package models

import "time"

type Refund struct {
	ID      uint      `gorm:"primaryKey" json:"id"`
	OrderID uint      `gorm:"not null" json:"order_id"`
	Amount  float64   `gorm:"type:decimal(10,2);not null" json:"amount"`
	Reason  string    `gorm:"type:text;not null" json:"reason"`
	Date    time.Time `gorm:"type:timestamp;not null" json:"date"`
}
