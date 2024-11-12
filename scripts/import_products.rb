# Import filename passed to Products collection
# Usage: ruby scripts/import_products.rb <input file name>
#   if input file name is omitted, products.json is assumed
require './config/environment'
require 'json'
include ActionView::Helpers::TextHelper

input_file_name = ARGV[0] || './products.json'
abort "File not found #{input_file_name}\nUsage: ruby import_products input_file_name\nIf no filename passed, products.json is assumed" unless File.exist?(input_file_name)
data_file = File.read(input_file_name)
all_products = JSON.parse(data_file)# frozen_string_literal: true

previous_count = Product.count
all_products['products'].each { |p| Product.find_or_create_by(p)}
new_count = Product.count
puts "Job Done - Imported #{pluralize(new_count - previous_count, 'product')} into products collection"

