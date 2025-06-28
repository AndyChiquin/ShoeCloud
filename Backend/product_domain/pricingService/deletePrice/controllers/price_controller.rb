require './models/price'

class PriceController
  def self.delete_price(id)
    price = Price.find_by(id: id)

    if price
      price.destroy
      { success: true, message: "Price deleted" }
    else
      { success: false, error: "Price not found" }
    end
  end
end
