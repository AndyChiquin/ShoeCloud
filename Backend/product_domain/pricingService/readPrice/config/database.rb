require 'sinatra/activerecord'
require 'dotenv/load'

set :database, {
  adapter: ENV['DB_ADAPTER'],
  host: ENV['DB_HOST'],
  port: ENV['DB_PORT'],
  database: ENV['DB_NAME'],
  username: ENV['DB_USER'],
  password: ENV['DB_PASSWORD']
}
