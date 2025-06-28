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
        if event.data == "get_all_prices"
          prices = Price.all.to_json
          ws.send(prices)
        else
          ws.send({ error: "Comando no válido" }.to_json)
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


