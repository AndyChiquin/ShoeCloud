# app/graphql/types/apply_rules_result_type.rb
module Types
  class ApplyRulesResultType < Types::BaseObject
    field :total_after_rules, Float, null: false
    field :applied_rules, [String], null: false
    field :warnings, [String], null: false
  end
end
