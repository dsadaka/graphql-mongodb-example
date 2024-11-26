import { Product } from "interface";

export const initialState = { data: [] };

export const reducer = (state = initialState, action: any)=>{
    switch (action.type){
        case "PRODUCTS_DATA" :
            return { 
                ...state, data: action.payload
            }
        case "DELETE_PRODUCT":
            return {
                ...state,
                data: state.data.filter((product: Product) => product.id !== action.payload),
            };
        case "EDIT_PRODUCT":
            return {
                ...state,
                selectedProduct: state.data.find((product: Product) => product.id === action.payload),
            };
        case "UPDATE_PRODUCT":
            return {
                ...state,
                data: state.data.map((product: Product) =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        case "CREATE_PRODUCT":
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        default:
            return state;
    }
}