# app/graphql/mutations/apply_rules.rb
module Mutations
  class ApplyRules < GraphQL::Schema::Mutation
    argument :cart, GraphQL::Types::JSON, required: true

    field :total_after_rules, Float, null: false
    field :applied_rules, [String], null: false
    field :warnings, [String], null: false

    def resolve(cart:)
      total = cart["total"]
      rules = Rule.all
      applied = []
      warnings = []

      rules.each do |rule|
        if rule.condition["min_total"] && total >= rule.condition["min_total"]
          descuento = (total * rule.discount_percent / 100.0)
          total -= descuento
          applied << rule.name
        end
      end

      {
        total_after_rules: total.round(2),
        applied_rules: applied,
        warnings: warnings
      }
    end
  end
end
