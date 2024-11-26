import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../queries/queries';
import { Product } from '../interface';
import { useDispatch } from "react-redux";
import { deleteProductAction, updateProductAction, createProductAction } from "redux/action";
import Cookies from 'js-cookie';

const csrfToken = getCSRFToken();

const API_URL = 'http://localhost:3000/graphql'

const graphQLClient = new GraphQLClient(API_URL, {
    headers: {'X-CSRF-TOKEN': csrfToken},
    method: 'POST'
});

interface CreateProductResponse {
    createProduct: Product;
}

interface ProductsResponse {
    products: Product[];
}

interface DeleteProductResponse {
    deleteProduct: {
        id: string;
    };
}

interface UpdateProductResponse {
    productUpdate: Product;
  }
  
interface GetProductResponse {
    product: Product;
}

export function useGetProducts() {
    return useQuery<ProductsResponse>(
        ["products"],
        async (): Promise<ProductsResponse> => {
            const response = await graphQLClient.request<ProductsResponse>(GET_PRODUCTS);
            return response;
        }
    );
}

export function useGetProduct(id: string) {
    return useQuery<Product>(
      ["get-product", id], 
      async (): Promise<Product> => {
        const response = await graphQLClient.request<GetProductResponse>(GET_PRODUCT, { id });
        if (!response) {
          throw new Error("Product not found");
        }
        return response?.product;
      }
    );
  }

export function useCreateProduct() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation(
        async (data: any) => {
            const response = await graphQLClient.request<CreateProductResponse>(CREATE_PRODUCT, { ...data });
            return response.createProduct;
        },
        {
            onSuccess: (createdProduct) => {
                /* Dispatching redux create event on successfull api call */
                dispatch(createProductAction(createdProduct));
                queryClient.invalidateQueries(["products"]);
            },
            onError: (error) => {
                console.error("Error creating product:", error);
            },
        }
    );
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation(
      ["update-product"],
      async (data: Product) => {
        const response = await graphQLClient.request<UpdateProductResponse>(UPDATE_PRODUCT, { ...data });
        return response?.productUpdate;
      },
      {
          onSuccess: (productUpdate) => {
              /* Dispatching redux update event on successfull api call */
              dispatch(updateProductAction(productUpdate));
              queryClient.invalidateQueries(["products"]);
          },
          onError: (error) => {
              console.error("Error creating product:", error);
          },
      }
    );
  }

export function useDeleteProduct() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    
    return useMutation(
        async (id: string) => {
            const response = await graphQLClient.request<DeleteProductResponse>(DELETE_PRODUCT, { id });
            return { id, result: response.deleteProduct }; 
        },
        {
            onSuccess: ({id}) => {
                /* Dispatching redux delete event on successfull api call */
                dispatch(deleteProductAction(id));
                queryClient.invalidateQueries(["products"]);
            },
            onError: (error) => {
                console.error("Error deleting product:", error);
            },
        }
    );
}

function getCSRFToken() {
    return Cookies.get('XSRF-TOKEN');
}
