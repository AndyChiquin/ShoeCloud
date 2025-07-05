require_relative '../models/price'

class PriceController
  def self.update(product_id, data)
    price = Price.find_by(product_id: product_id)  
    return nil unless price

    price.update(
      price:         data['price']         || price.price,
      discount_type: data['discount_type'] || price.discount_type,
      percentage:    data['percentage']    || price.percentage,
      valid_until:   data['valid_until']   || price.valid_until
    )

    price
  end
end
