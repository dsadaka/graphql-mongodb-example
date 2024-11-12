# frozen_string_literal: true

module Types
  module Input
    class ProductInputType < Types::BaseInputObject
      argument :name, String, required: true
      argument :type, String, required: true
      argument :length, Integer, required: true
      argument :width, Integer, required: true
      argument :height, Integer, required: true
      argument :weight, Integer, required: true
    end
  end
end