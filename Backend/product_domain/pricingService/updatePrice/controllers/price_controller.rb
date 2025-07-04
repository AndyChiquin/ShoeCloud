require_relative '../models/price'

class PriceController
  def self.update(id, data)
    price = Price.find_by(id: id.to_i)
    return nil unless price

    price.update(
      product_id:    data['product_id']    || price.product_id,
      price:         data['price']         || price.price,
      discount_type: data['discount_type'] || price.discount_type,
      percentage:    data['percentage']    || price.percentage,
      valid_until:   data['valid_until']   || price.valid_until
    )

    price
  end
end
