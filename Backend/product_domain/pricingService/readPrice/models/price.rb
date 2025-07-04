require 'active_record'

class Price < ActiveRecord::Base
  self.table_name = 'prices'
end
