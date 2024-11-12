# frozen_string_literal: true

module Types
  class ProductType < Types::BaseObject
    field :id, String, null: false
    field :name, String, null: false
    field :type, String, null: false
    field :length, Integer, null: false
    field :width, Integer, null: false
    field :height, Integer, null: false
    field :weight, Integer, null: false
  end
end