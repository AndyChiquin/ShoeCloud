package routes

import (
	"createRefund/app/handlers"
	"net/http"
)

func RegisterRefundRoutes() {
	http.HandleFunc("/refunds", handlers.CreateRefundHandler)
}
