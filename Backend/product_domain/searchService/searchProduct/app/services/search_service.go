package services

import (
	"context"
	"searchProduct/app/config"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Product struct {
	Name        string  `bson:"name" json:"name"`
	Description string  `bson:"description" json:"description"`
	Category    string  `bson:"category" json:"category"`
	Price       float64 `bson:"price" json:"price"`
}

func PerformSearch(query string) ([]Product, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := config.MongoDatabase.Collection("products")

	filter := bson.M{
		"$or": []bson.M{
			{"name": bson.M{"$regex": query, "$options": "i"}},
			{"description": bson.M{"$regex": query, "$options": "i"}},
			{"category": bson.M{"$regex": query, "$options": "i"}},
		},
	}

	opts := options.Find().SetLimit(50)

	cursor, err := collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []Product
	for cursor.Next(ctx) {
		var product Product
		if err := cursor.Decode(&product); err != nil {
			continue
		}
		results = append(results, product)
	}

	return results, nil
}
