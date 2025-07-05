const WebSocket = require('ws');

function notifyPricingService(productId, price) {
  console.log('[DEBUG] Enviando a pricingService UPDATE');
  console.log('productId:', productId);
  console.log('price:', price);

  const ws = new WebSocket('ws://34.198.245.223:3020/ws/price'); // UPDATE

  ws.on('open', () => {
    const payload = {
      action: "update",
      data: {
        id: productId,  // debe llamarse "id" si el microservicio Ruby lo espera así
        price,
        discount_type: "none",
        percentage: 0,
        valid_until: "2025-12-31"
      }
    };

    console.log('Payload enviado:', payload);  // 👈 nuevo log

    ws.send(JSON.stringify(payload));
    ws.close();
  });

  ws.on('message', (data) => {
    console.log('[pricingService response]:', data.toString());
  });

  ws.on('error', (err) => {
    console.error('[WebSocket Error]:', err.message);
  });
}

module.exports = notifyPricingService;
