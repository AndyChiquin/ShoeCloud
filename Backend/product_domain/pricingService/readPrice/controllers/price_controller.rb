require './models/price'

class PriceController
  def self.get_all
    Price.all
  end

  def self.get_by_id(id)
    Price.find_by(id: id)
  end

  def self.get_by_product(product_id)
    Price.where(product_id: product_id)
  end
end
