package services

import (
	"context"
	"time"

	"indexProduct/app/config"

	"go.mongodb.org/mongo-driver/bson"
)

type ProductInput struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Category    string  `json:"category" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
}

func SaveProduct(p ProductInput) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := config.MongoDatabase.Collection("products")

	// Documento a insertar
	document := bson.M{
		"name":        p.Name,
		"description": p.Description,
		"category":    p.Category,
		"price":       p.Price,
	}

	_, err := collection.InsertOne(ctx, document)
	return err
}
