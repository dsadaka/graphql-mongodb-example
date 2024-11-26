import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
    query ListProducts {
      products {
        id
        name
        type
        length
        width
        height
        weight
      }
    }
`
export const GET_PRODUCT = gql`
    query ListProduct($id: ID!) {
      product(id: $id) {
        id
        name
        type
        length
        width
        height
        weight
      }
    }
`
export const CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!, $type: String!, $length: Int!, $width: Int!, $height: Int!, $weight: Int!) {
      createProduct(input: { params: { name: $name, type: $type, length: $length, width: $width, height: $height, weight: $weight } }) {
        product {
          id
          name
          type
          length
          width
          height
          weight
        }
      }
    }
`
export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id: ID!, $name: String!, $type: String!, $length: Int!, $width: Int!, $height: Int!, $weight: Int!) {
      productUpdate(input: { id: $id, productInput: { name: $name, type: $type, length: $length, width: $width, height: $height, weight: $weight } }) {
        product {
          id
          name
          type
          length
          width
          height
          weight
        }        
      }
    }
`
export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
      productDelete(input: { id: $id }) {
        message
      }
    }
`
