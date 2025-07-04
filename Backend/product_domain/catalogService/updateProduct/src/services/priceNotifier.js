const WebSocket = require('ws');

function notifyPricingService(productId, price) {
  const ws = new WebSocket('ws://52.2.232.26:3020/ws/price'); 

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

    ws.send(JSON.stringify(payload));
    ws.close(); 
  });

  ws.on('message', (data) => {
    console.log('[pricingService]:', data.toString());
  });

  ws.on('error', (err) => {
    console.error('[WebSocket Error pricingService]:', err.message);
  });
}

module.exports = notifyPricingService;
