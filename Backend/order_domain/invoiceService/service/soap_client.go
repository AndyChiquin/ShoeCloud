package service

import (
	"bytes"
	"encoding/xml"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

// Estructura para la respuesta SOAP (ajusta según tu WSDL)
type GetOrderResponse struct {
	XMLName xml.Name `xml:"Envelope"`
	Body    struct {
		Response struct {
			OrderID int     `xml:"id"`
			UserID  int     `xml:"user_id"`
			Date    string  `xml:"date"`
			Status  string  `xml:"status"`
			Total   float64 `xml:"total"`
		} `xml:"GetOrderByIdResponse"`
	} `xml:"Body"`
}

// Función que verifica si la orden existe
func CheckOrderExists(orderID int) (bool, error) {
	url := os.Getenv("ORDER_SOAP_URL")

	// Mensaje SOAP
	soapRequest := fmt.Sprintf(`
	<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ord="http://orderservice.example.com">
		<soapenv:Header/>
		<soapenv:Body>
			<ord:GetOrderById>
				<orderId>%d</orderId>
			</ord:GetOrderById>
		</soapenv:Body>
	</soapenv:Envelope>`, orderID)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer([]byte(soapRequest)))
	if err != nil {
		return false, err
	}

	req.Header.Add("Content-Type", "text/xml; charset=utf-8")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return false, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return false, errors.New("invalid response from orderService")
	}

	bodyBytes, _ := ioutil.ReadAll(res.Body)

	var soapResp GetOrderResponse
	err = xml.Unmarshal(bodyBytes, &soapResp)
	if err != nil {
		return false, err
	}

	// Validar si viene un ID
	if soapResp.Body.Response.OrderID > 0 {
		return true, nil
	}
	return false, nil
}
