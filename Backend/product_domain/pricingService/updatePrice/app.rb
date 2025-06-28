require 'sinatra'
require 'faye/websocket'
require 'eventmachine'
require_relative './config/database'
require_relative './routes/pricing_routes'
require_relative './ws/ws_server'

set :bind, '0.0.0.0'

# WebSocket + Sinatra combo (puerto distinto para evitar conflicto)
Thread.new do
  EM.run do
    app = Proc.new { |env| WebSocketServer.handle(env) }
    Rack::Handler::Thin.run(app, Port: 4568)
  end
end
