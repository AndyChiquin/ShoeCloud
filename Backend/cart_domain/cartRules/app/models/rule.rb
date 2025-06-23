# app/models/rule.rb
class Rule
  include Mongoid::Document
  field :name, type: String
  field :description, type: String
  field :condition, type: Hash   # Por ejemplo: { "min_total" => 100 }
  field :discount_percent, type: Integer
end
