require 'sinatra'
require 'dotenv/load'
require_relative './config/database'
require_relative './controllers/price_controller'
require 'faye/websocket'
require 'eventmachine'
require 'json'

set :bind, '0.0.0.0'

get '/ws/price' do
  if Faye::WebSocket.websocket?(env)
    ws = Faye::WebSocket.new(env)

    ws.on :message do |event|
      begin
        data = JSON.parse(event.data)

        if data['action'] == 'create'
          puts "[WS] Precio recibido: #{data['data']}"

          created = PriceController.create(data['data'])

          ws.send({ success: true, created: created }.to_json)
        else
          ws.send({ error: 'Acción no soportada' }.to_json)
        end
      rescue => e
        ws.send({ error: "Error: #{e.message}" }.to_json)
      end
    end

    ws.on :close do |_event|
      puts "[WS] Conexión cerrada"
      ws = nil
    end

    ws.rack_response
  else
    status 400
    body "No es una conexión WebSocket"
  end
end
