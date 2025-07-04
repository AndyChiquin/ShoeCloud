require_relative '../models/price'

class PriceController
  def self.delete(id)
    price = Price.find_by(id: id)
    return nil unless price

    price.destroy
    price
  end
end
