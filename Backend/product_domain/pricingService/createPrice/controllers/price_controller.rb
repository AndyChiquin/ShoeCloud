require './models/price'

class PriceController
  def self.create(data)
    Price.create(data)
  end
end
