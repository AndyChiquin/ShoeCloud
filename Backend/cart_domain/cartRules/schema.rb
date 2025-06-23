# schema.rb
require_relative './app/graphql/mutations/apply_rules'
require_relative './app/graphql/types/apply_rules_result_type'
require_relative './app/graphql/types/base_object'

class CartRulesSchema < GraphQL::Schema
  mutation(Types::MutationType)
end

module Types
  class MutationType < Types::BaseObject
    field :apply_rules, mutation: Mutations::ApplyRules
  end
end
