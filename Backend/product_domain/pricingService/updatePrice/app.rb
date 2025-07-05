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

        if data['action'] == 'update'
          product_id = data['data']['product_id']
          puts "[WS] Action: update for product #{product_id}"

          updated = PriceController.update(product_id, data['data'])

          if updated
            ws.send({ success: true, updated: updated }.to_json)
          else
            ws.send({ error: "Price not found with id #{id}" }.to_json)
          end
        else
          ws.send({ error: 'Action not supported' }.to_json)
        end
      rescue => e
        ws.send({ error: "Error: #{e.message}" }.to_json)
      end
    end

    ws.on :close do |_event|
      puts "[WS] Closed connection"
      ws = nil
    end

    ws.rack_response
  else
    status 400
    body "This is not a WebSocket connection."
  end
end
