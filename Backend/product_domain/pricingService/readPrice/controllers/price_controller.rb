require './models/price'

class PriceController
  def self.read_all
    Price.all
  end
end
