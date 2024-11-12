# frozen_string_literal: true

module Mutations
  class ProductUpdate < BaseMutation
    description "Updates a product by id"

    field :product, Types::ProductType, null: false

    argument :id, ID, required: true
    argument :product_input, Types::Input::ProductUpdateType, required: true

    def resolve(id:, product_input:)
      product = ::Product.find(id)
      raise GraphQL::ExecutionError.new "Error updating product", extensions: product.errors.to_hash unless product.update(**product_input)

      { product: product }
    end
  end
end
