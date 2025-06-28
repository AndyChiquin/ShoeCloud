require './models/price'
require './ws/ws_client'

class PriceController
  def self.create(data)
    price = Price.create(data)

    if price.persisted?
      WebSocketClient.send_price_update(price)
    end

    price
  end
end
