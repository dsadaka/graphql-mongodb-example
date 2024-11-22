import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { GraphQLClient, request } from "graphql-request";
import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../queries/queries'
import Cookies from 'js-cookie'

const csrfToken = getCSRFToken();

const API_URL = 'http://localhost:3000/graphql'

const graphQLClient = new GraphQLClient(API_URL, {
    headers: {'X-CSRF-TOKEN': csrfToken},
    method: 'POST'
});

export function useGetProducts() {
    return useQuery(["products"], async () => {
        const getProductList = await graphQLClient.request(GET_PRODUCTS);
        return getProductList;
    });
}

export function useGetProduct() {
    return useQuery(["get-product", id], async () => {
        const { getProduct } = await graphQLClient.request(GET_PRODUCT, { id });
        return getProduct;
    });
}

export function useCreateProduct() {
    return useMutation(["update-product"], async (data) => {
        const { updateProduct } = await graphQLClient.request(CREATE_PRODUCT, { data });
        return updateProduct;
    });
}
export function useUpdateProduct() {
    return useMutation(["update-product"], async (data) => {
        const { updateProduct } = await graphQLClient.request(UPDATE_PRODUCT, { data });
        return updateProduct;
    });
}

export function useDeleteProduct() {
    return useQuery(["delete-product", id], async () => {
        const { deleteProduct } = await graphQLClient.request(DELETE_PRODUCT, { id });
        return deleteProduct;
    });
}
function getCSRFToken() {
    return Cookies.get('XSRF-TOKEN');
}
