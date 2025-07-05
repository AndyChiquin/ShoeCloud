const WebSocket = require('ws');

function notifyPricingService(productId, price) {
  const ws = new WebSocket('ws://34.198.245.223:3020/ws/price'); 

  ws.on('open', () => {
    const payload = {
      action: "update",
      data: {
        id: productId,
        price,
        discount_type: "none",
        percentage: 0,
        valid_until: "2025-12-31"
      }
    };

    ws.send(JSON.stringify(payload));
    ws.close(); 
  });

  ws.on('message', (data) => {
    console.log('[pricingService - update]:', data.toString());
  });

  ws.on('error', (err) => {
    console.error('[WebSocket Error pricingService - update]:', err.message);
  });
}

module.exports = notifyPricingService;
