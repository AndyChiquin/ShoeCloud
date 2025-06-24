package grpc

import (
	"context"
	"createRefund/app/grpc/orderpb"
	"fmt"
	"os"
	"time"

	"google.golang.org/grpc"
)

func CheckOrderExists(orderID uint) (bool, error) {
	// Dirección del microservicio de órdenes, desde variable de entorno
	orderServiceAddress := os.Getenv("ORDER_GRPC_ADDR") // ej: "order-service:50051"

	// Crear conexión gRPC
	conn, err := grpc.Dial(orderServiceAddress, grpc.WithInsecure(), grpc.WithBlock(), grpc.WithTimeout(5*time.Second))
	if err != nil {
		return false, fmt.Errorf("❌ Failed to connect to order service: %v", err)
	}
	defer conn.Close()

	client := orderpb.NewOrderServiceClient(conn)

	// Crear solicitud
	req := &orderpb.CheckOrderRequest{
		OrderId: int32(orderID),
	}

	// Hacer la llamada
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, err := client.CheckOrder(ctx, req)
	if err != nil {
		return false, fmt.Errorf("❌ gRPC error from order service: %v", err)
	}

	return res.Exists, nil
}
