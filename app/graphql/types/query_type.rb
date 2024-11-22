# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :product, Types::ProductType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def product(id:)
      # context.schema.object_from_id(id, context)
      Product.find(id)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :products, [Types::ProductType], null: false,
      description: "Return a list of products"
    def products
      Product.all
    end
  end
end
