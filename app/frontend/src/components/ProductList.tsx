import React from "react"
import { FC } from 'react';
import { useGetProducts} from "../services/useRequests";
import { Table } from "@chakra-ui/react"

// Components
const ProductList: FC = () => {
    const { data, error, isLoading, isSuccess } = useGetProducts();

    if (error) return <h1>Something went wrong!</h1>;
    if (isLoading) return <h1>Loading...</h1>;

    return (
        <Table.Root striped variant="outline" colorPalette="green" showColumnBorder="true">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Type</Table.ColumnHeader>
                    <Table.ColumnHeader>Weight</Table.ColumnHeader>
                    <Table.ColumnHeader>Dimensions (Length x Width x Height</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.products.map(product => (
                    <Table.Row key={product.id}>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.type}</Table.Cell>
                        <Table.Cell>{product.weight}</Table.Cell>
                        <Table.Cell>{product.length} x {product.width} x {product.height}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
export default ProductList;
