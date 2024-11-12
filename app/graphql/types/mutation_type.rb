# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :product_delete, mutation: Mutations::ProductDelete
    field :product_update, mutation: Mutations::ProductUpdate
    field :create_product, mutation: Mutations::CreateProduct
  end
end
