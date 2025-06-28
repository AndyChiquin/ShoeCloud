require 'eventmachine'
require 'rack'
require_relative './config/database'
require_relative './ws/ws_server'

EM.run do
  puts "[WebSocket] Servidor WebSocket escuchando en ws://0.0.0.0:4567/ws/price"

  app = Proc.new do |env|
    WebSocketServer.handle(env)
  end

  Rack::Handler::Thin.run(app, Port: 4567)
end
