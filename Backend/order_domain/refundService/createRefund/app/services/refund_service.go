package services

import (
	"createRefund/app/config"
	"createRefund/app/grpc"
	"createRefund/app/models"
	"errors"
	"time"
)

func CreateRefund(refund *models.Refund) error {
	// Verificar si la orden existe usando gRPC
	orderExists, err := grpc.CheckOrderExists(refund.OrderID)
	if err != nil {
		return err
	}

	if !orderExists {
		return errors.New("❌ Order ID not found in OrderService")
	}

	// Asignar fecha actual
	refund.Date = time.Now()

	// Guardar en la base de datos
	if err := config.DB.Create(refund).Error; err != nil {
		return errors.New("❌ Failed to save refund: " + err.Error())
	}

	return nil
}
