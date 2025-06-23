require 'sinatra'
require 'graphql'
require 'mongoid'
require 'dotenv/load'
require_relative './schema'

Mongoid.load!('config/mongoid.yml', :development)

post "/graphql" do
  result = CartRulesSchema.execute(
    params[:query],
    variables: params[:variables],
    context: {},
    operation_name: params[:operationName]
  )
  content_type :json
  result.to_json
end

get "/" do
  "🛒 cartRules GraphQL service is running!"
end
