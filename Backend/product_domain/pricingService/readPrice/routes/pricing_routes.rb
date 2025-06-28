require 'sinatra'
require 'json'
require_relative '../controllers/price_controller'

put '/api/price/:id' do
  data = JSON.parse(request.body.read)
  result = PriceController.update_price(params[:id], data)

  status result[:success] ? 200 : 404
  result.to_json
end
