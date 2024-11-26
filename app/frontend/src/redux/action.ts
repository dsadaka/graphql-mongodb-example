import { Product } from "interface";

export const createProductAction = (product: Product) => ({
    type: "CREATE_PRODUCT",
    payload: product,
});

export const setProductsData = (products: Product[]) => ({
    type: "PRODUCTS_DATA",
    payload: products,
});

export const deleteProductAction = (id: string) => ({
    type: "DELETE_PRODUCT",
    payload: id,
});

export const editProductAction = (id: string) => ({
    type: "EDIT_PRODUCT",
    payload: id,
});

export const updateProductAction = (product: Product) => ({
    type: "UPDATE_PRODUCT",
    payload: product,
});
