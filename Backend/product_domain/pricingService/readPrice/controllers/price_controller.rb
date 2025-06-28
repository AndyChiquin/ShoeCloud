require './models/price'

class PriceController
  def self.update_price(id, data)
    price = Price.find_by(id: id)

    if price
      price.update(data)
      { success: true, updated: price }
    else
      { success: false, error: "Price not found" }
    end
  end
end
