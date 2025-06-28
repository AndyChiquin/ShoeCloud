package services

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"indexProduct/app/config"
	"io"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type ProductInput struct {
	ProductID   string  `json:"product_id" binding:"required"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Category    string  `json:"category"`
	Price       float64 `json:"price"`
}

// Estructura para mapear la respuesta del catalogService
type CatalogResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	CategoryID  string  `json:"category_id"`
	Price       float64 `json:"price"`
}

func SaveProduct(p ProductInput) error {
	// 1. Hacer GET al catalogService con el product_id
	url := fmt.Sprintf("http://13.216.150.108:3001/api/products/%s", p.ProductID)

	resp, err := http.Get(url)
	if err != nil {
		return errors.New("error al conectar con catalogService: " + err.Error())
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return errors.New("el producto no existe en catalogService")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return errors.New("error leyendo respuesta de catalogService: " + err.Error())
	}

	var catalogData CatalogResponse
	if err := json.Unmarshal(body, &catalogData); err != nil {
		return errors.New("error parseando respuesta JSON del catálogo: " + err.Error())
	}

	// 2. Insertar en MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := config.MongoDatabase.Collection("products")

	document := bson.M{
		"name":        catalogData.Name,
		"description": catalogData.Description,
		"category":    catalogData.CategoryID,
		"price":       catalogData.Price,
	}

	_, err = collection.InsertOne(ctx, document)
	return err
}
