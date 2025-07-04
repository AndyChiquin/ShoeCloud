require './models/price'
require './ws/ws_client'

class PriceController
  def self.create(data)
    price = Price.create(data)

    
    price
  end
end
