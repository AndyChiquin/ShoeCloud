package handlers

import (
	"createRefund/app/models"
	"createRefund/app/services"
	"encoding/json"
	"net/http"
)

func CreateRefundHandler(w http.ResponseWriter, r *http.Request) {
	var refund models.Refund

	// Decodificar JSON
	if err := json.NewDecoder(r.Body).Decode(&refund); err != nil {
		http.Error(w, "❌ Invalid request payload", http.StatusBadRequest)
		return
	}

	// Crear el reembolso
	if err := services.CreateRefund(&refund); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Devolver respuesta OK
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(refund)
}
