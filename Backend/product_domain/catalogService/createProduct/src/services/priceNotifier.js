const WebSocket = require('ws');

function notifyPricingService(productId, price) {
  const ws = new WebSocket('ws://52.2.232.26:3018/ws/price');

  ws.on('open', function open() {
    const message = {
      action: "create",
      data: {
        product_id: productId,
        price: price,
        discount_type: "none",
        percentage: 0,
        valid_until: "2025-12-31"
      }
    };
    ws.send(JSON.stringify(message));
    ws.close(); 
  });

  ws.on('message', function message(data) {
    console.log('[pricingService]:', data.toString());
  });

  ws.on('error', function error(err) {
    console.error('[WebSocket Error pricingService]:', err.message);
  });
}

module.exports = notifyPricingService;
