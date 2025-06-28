require 'sinatra'
require 'dotenv/load'
require_relative './config/database'
require_relative './routes/pricing_routes'

set :bind, '0.0.0.0'
