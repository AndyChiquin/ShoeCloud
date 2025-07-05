const WebSocket = require('ws');

function notifyPricingService(productId, price) {
  console.log('[DEBUG] Enviando a pricingService UPDATE');
  console.log('productId:', productId);
  console.log('price:', price);

  const ws = new WebSocket('ws://34.198.245.223:3020/ws/price'); 

  ws.on('open', () => {
    const payload = {
      action: "update",
      data: {
        product_id: productId,  
        price,
        discount_type: "none",
        percentage: 0,
        valid_until: "2025-12-31"
      }
    };

    console.log('Payload enviado:', payload);  

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
