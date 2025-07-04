# require 'sinatra'
# require 'json'
# require_relative '../controllers/price_controller'

# delete '/api/price/:id' do
#   result = PriceController.delete_price(params[:id])
#   status result[:success] ? 200 : 404
#   result.to_json
# end
