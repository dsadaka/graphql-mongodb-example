// components/PostTemplate.js
import React from "react";
import { FC } from 'react';

import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useGetProduct } from '../services/useRequests'
export const ProductTemplate: FC = () => {
    const { id } = useParams();
    const { product } = useParams();
    const { data, error, isLoading, isSuccess } = useGetProduct(id);

    if (error) return '<h1>Something went wrong!</h1>;'
    if (isLoading) return '<h1>Loading...</h1>;'

    return (isSuccess &&
            <product className="Product">
                <h1>{data.name}</h1>
                <ReactMarkdown source={data.content} />
            </product>
        );
}
