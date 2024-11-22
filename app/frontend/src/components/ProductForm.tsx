import React from "react"
import { FC } from 'react';
import { useForm } from  'react-hook-form';
import { useMutation} from "@tanstack/react-query";
import { Button } from "./components/ui/button"
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Heading, Text, Box, Flex  } from "@chakra-ui/react"
import { useCreateProduct } from "../services/useRequests";
import { useGQLQuery } from "../services/useGQLQuery";
import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../queries/queries'

// Components

const ProductForm: FC = ({ product }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: product,
    });
    // const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (product) {
            // await useMutation('createProduct', CREATE_PRODUCT, { id: product.id, ...data });
        } else {
            useCreateProduct(data)
        }
        reset();
        // navigate('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*<input type="hidden" value={product.id} {...register('id')} />*/}
            <input type="text" placeholder="Name" {...register('name', { required: true })} />
            <input type="text" placeholder="Type" {...register('type', { required: true })} />
            <input type="number" placeholder="Length" {...register('length', { required: true })} />
            <input type="number" placeholder="Width" {...register('width', { required: true })} />
            <input type="number" placeholder="Height" {...register('height', { required: true })} />
            <input type="number" placeholder="Weight" {...register('weight', { required: true })} />
            <button type="submit">Save</button>
        </form>
    );
};

export default ProductForm;
