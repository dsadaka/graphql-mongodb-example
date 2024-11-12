# frozen_string_literal: false

module Types
  module Input
    class ProductUpdateType < Types::BaseInputObject
      argument :name, String, required: false
      argument :type, String, required: false
      argument :length, Integer, required: false
      argument :width, Integer, required: false
      argument :height, Integer, required: false
      argument :weight, Integer, required: false
    end
  end
end