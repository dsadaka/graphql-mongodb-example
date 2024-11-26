import { FC, useEffect, useState, useMemo } from 'react';
import { useGetProducts, useDeleteProduct} from "../services/useRequests";
import { Table, Button, Box, Input, Heading, HStack, IconButton, DialogFooter, DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger} from "@chakra-ui/react";
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
  } from "components/ui/pagination"
import ProductForm from './ProductForm';
import { Product } from '../interface';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setProductsData } from '../redux/action';

const pageSize = 5;

const ProductList: FC = () => {
    const { data, error, isLoading } = useGetProducts();
    const { mutate: deleteProduct } = useDeleteProduct();
    const [ deleteTrigger, setDeleteTrigger ] = useState(false);
    const [ deleteId, setdeleteId ] = useState("");
    const [ productId, setProductId ] = useState("");
    const [ search, setSearch ] = useState("");
    const [ createProductTrigger, setCreateProductTrigger ] = useState(false);
    const products = useSelector((state: any)=> state.data);
    const dispatch = useDispatch();

    /* For Pagination */ 
    const [page, setPage] = useState(1);

    useEffect(()=>{
        dispatch(setProductsData(data?.products || []));
    },[data]);

    /* Search */ 
    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page on search
    };

    const filteredData = useMemo(() => {
        if (!search) return products;
        return products?.filter((item: Product) =>
            item?.name?.toLowerCase()?.includes(search?.toLowerCase())
        );
    }, [search, products]);

    const visibleItems = useMemo(() => {
        const startRange = (page - 1) * pageSize;
        const endRange = startRange + pageSize;
        return filteredData.slice(startRange, endRange);
    }, [filteredData, page]);

    if (error) return <h1>Something went wrong!</h1>;
    if (isLoading) return <h1>Loading...</h1>;

    /* For Create & Update Product*/ 
    const closeHandler=()=>{
        setCreateProductTrigger(false);
        setProductId("");
    }

    /* For Update Product*/ 
    const getProduct=(id: string)=>{
        setProductId(id);
        setCreateProductTrigger(true);
    }

    /* For Delete Logic*/
    const deleteHandler=(id: string)=>{
        setDeleteTrigger(true);
        setdeleteId(id);
    };

    const confirmDelete=()=>{
        deleteProduct(deleteId);
        setDeleteTrigger(false);
        setdeleteId("");
    }

    return (
        <Box p={5} minWidth="480px">
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={5}>
                <Heading size="xl">Products</Heading>
                {/* For create/update product */}
                <DialogRoot preventScroll open={createProductTrigger}>
                    <DialogTrigger asChild>
                        <Button bg="teal.500" color="white" px={2} onClick={()=>{setCreateProductTrigger(true)}}>Create Product</Button>
                    </DialogTrigger>
                    <DialogContent
                        position="fixed"
                        top="30%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        bg="white"
                        p={4}
                        borderRadius="md"
                        boxShadow="lg"
                        zIndex="modal"
                        >
                        <DialogHeader>
                            <DialogTitle>{productId ? 'Update Product' : 'Create Product'}</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <ProductForm onClose={closeHandler} id={productId}/>
                        </DialogBody>
                        <DialogCloseTrigger />
                    </DialogContent>
                </DialogRoot>
                {/* For delete dialog */}
                <DialogRoot preventScroll open={deleteTrigger}>
                    <DialogContent 
                        position="fixed"
                        top="30%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        bg="white"
                        p={4}
                        borderRadius="md"
                        boxShadow="lg"
                        zIndex="modal"
                    >
                        <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <p>
                                Are you sure you wants to delete this product.
                            </p>
                        </DialogBody>
                        <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button px={2} border="2px solid #ddd" outline="none" onClick={()=>{setDeleteTrigger(false)}}>Cancel</Button>
                        </DialogActionTrigger>
                            <Button bg="teal.500" color="white" variant="outline" px={2} onClick={confirmDelete}>Submit</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                    </DialogContent>
                </DialogRoot>
            </Box>
            <Box my={4}>
                <Input placeholder="Search By Name" type="text" width="200px" px={2} border="1px solid #ddd" onChange={(e)=>{searchHandler(e)}}/>
            </Box>
            <Table.Root variant="outline" showColumnBorder={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader style={{ width: "20%" }}>Name</Table.ColumnHeader>
                            <Table.ColumnHeader style={{ width: "18%" }}>Type</Table.ColumnHeader>
                            <Table.ColumnHeader style={{ width: "18%" }}>Weight</Table.ColumnHeader>
                            <Table.ColumnHeader style={{ width: "30%" }}>Dimensions (Length x Width x Height)</Table.ColumnHeader>
                            <Table.ColumnHeader style={{ width: "14%", paddingLeft: '2%' }}>Actions</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {visibleItems?.filter((item: Product)=> item?.name?.toLowerCase()?.includes(search?.toLowerCase()))?.map((product: Product) => (
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.type}</Table.Cell>
                                <Table.Cell>{product.weight}</Table.Cell>
                                <Table.Cell>{product.length} x {product.width} x {product.height}</Table.Cell>
                                <Table.Cell>
                                        <IconButton fontSize="40px" variant="outline" onClick={()=>{getProduct(product.id)}}>
                                            <FaEdit />
                                        </IconButton>
                                        <IconButton fontSize="40px" variant="outline" onClick={()=>{deleteHandler(product.id)}}>
                                            <MdDelete />
                                        </IconButton>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {filteredData?.length === 0 && <Box px={2}>No data available in table.</Box>}
                    </Table.Body>
            </Table.Root>
            {visibleItems?.length > 0 &&
            <PaginationRoot
                page={page}
                count={filteredData?.length || 0}
                pageSize={pageSize}
                onPageChange={(e) => setPage(e.page)}
                mt={2}
                variant="solid"
                >
                <HStack justifyContent="flex-end" width="100%">
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
            }
        </Box>
    );
}
export default ProductList;
