require 'faye/websocket'
require 'eventmachine'
require 'json'

module WebSocketClient
  def self.send_price_update(price)
    Thread.new do
      EM.run do
        ws = Faye::WebSocket::Client.new("ws://<IP_catalog_service>:<PORT>/ws/catalog")

        ws.on :open do |_event|
          puts "[WebSocket] Connected to catalogService"

          message = {
            type: "price_update",
            product_id: price.product_id,
            price: price.price
          }

          ws.send(message.to_json)
          ws.close
        end

        ws.on :error do |event|
          puts "[WebSocket] Error: #{event.message}"
        end

        ws.on :close do |_event|
          puts "[WebSocket] Connection closed"
          EM.stop
        end
      end
    end
  end
end
