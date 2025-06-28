require 'sinatra'
require 'json'
require_relative '../controllers/price_controller'

post '/api/price' do
  data = JSON.parse(request.body.read)
  created = PriceController.create(data)
  created.to_json
end
