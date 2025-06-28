require 'faye/websocket'
require 'json'
require_relative '../models/price'

class WebSocketServer
  def self.handle(env)
    if Faye::WebSocket.websocket?(env)
      ws = Faye::WebSocket.new(env)

      ws.on :open do |_event|
        puts "[WebSocket] Cliente conectado"
      end

      ws.on :message do |event|
        begin
          data = JSON.parse(event.data)

          if data["type"] == "delete_price"
            price = Price.find_by(id: data["id"])
            if price
              price.destroy
              ws.send({ success: true, message: "Price deleted" }.to_json)
            else
              ws.send({ success: false, error: "Price ID not found" }.to_json)
            end
          else
            ws.send({ error: "Comando no válido" }.to_json)
          end
        rescue => e
          ws.send({ error: "Error: #{e.message}" }.to_json)
        end
      end

      ws.on :close do |_event|
        puts "[WebSocket] Cliente desconectado"
        ws = nil
      end

      ws.rack_response
    else
      [200, { 'Content-Type' => 'text/plain' }, ['WebSocket activo']]
    end
  end
end
