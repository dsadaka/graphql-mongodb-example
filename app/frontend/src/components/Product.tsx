// components/Product.js
import React from "react"
import { FC } from 'react';

export const Product: FC = ({ key, product }) => {
    const { _id, name, type, length, width, height, weight } = product;
    return (
        <div className="Product" key={key}>
            <h1>{name}</h1>
            <p>{type}</p>
            <p>{length} {width} {height} {weight}</p>
        </div>
    );
}
