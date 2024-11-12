# frozen_string_literal: true

module Mutations
  class CreateProduct < Mutations::BaseMutation
    description "Create a product"
    argument :params, Types::Input::ProductInputType, required: true

    field :product, Types::ProductType, null: false

    def resolve(params:)
      product_params = Hash params

      { product: Product.create!(product_params) }
    end
  end
end