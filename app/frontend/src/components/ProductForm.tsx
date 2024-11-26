import { FC, useEffect } from 'react';
import { useForm } from  'react-hook-form';
import { useCreateProduct, useUpdateProduct } from "../services/useRequests";
import { Input, Button, Box} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { editProductAction } from 'redux/action';

interface FormData {
    name: string;
    type: string;
    length: number;
    width: number;
    height: number;
    weight: number;
}

interface ProductFormProps {
    onClose: () => void;
    id: string;
}

const ProductForm: FC<ProductFormProps> = ({onClose, id}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { mutate: createProduct } = useCreateProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const dispatch = useDispatch();
    const selectedProduct = useSelector((state: any)=> state.selectedProduct);

    useEffect(() => {
        dispatch(editProductAction(id));
        if (selectedProduct) {
            reset({
                name: selectedProduct?.name,
                type: selectedProduct?.type,
                length: selectedProduct?.length,
                width: selectedProduct?.width,
                height: selectedProduct?.height,
                weight: selectedProduct?.weight,
            });
        }
    }, [selectedProduct]);

    const productHandler=(data: any)=>{
        const formattedData = {
            ...data,
            length: parseInt(data.length, 10),
            width: parseInt(data.width, 10),
            height: parseInt(data.height, 10),
            weight: parseInt(data.weight, 10),
        };
        if(id){
            updateProduct({id, ...formattedData});
        }
        else{
           createProduct(formattedData);
        }
        closeHandler();
    };

    const closeHandler=()=>{
        reset();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(productHandler)}>
            <Input placeholder="Name" className={`${errors.name}` ? 'field--error' : ''} type="text" {...register('name', { required: true })} px={2} border="1px solid #ddd" mb={2}/>
            <Input placeholder="Type" className={`${errors.type}` ? 'field--error' : ''} type="text" {...register('type', { required: true })} px={2} border="1px solid #ddd" mb={2}/>
            <Input placeholder="Length" className={`${errors.length}` ? 'field--error' : ''} type="number" {...register('length', { required: true })} px={2} border="1px solid #ddd" mb={2}/>
            <Input placeholder="Width" className={`${errors.width}` ? 'field--error' : ''} type="number" {...register('width', { required: true })} px={2} border="1px solid #ddd" mb={2}/>
            <Input placeholder="Height" className={`${errors.height}` ? 'field--error' : ''} type="number" {...register('height', { required: true })} px={2} border="1px solid #ddd" mb={2}/>
            <Input placeholder="Weight" className={`${errors.weight}` ? 'field--error' : ''} type="number" {...register('weight', { required: true })} px={2} border="1px solid #ddd" mb={2}/>
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button border="2px solid #ddd" px={4} onClick={closeHandler} type="button">Cancel</Button>
                <Button bg="teal.500" color="white" px={4} type="submit">{id ? 'Update' : 'Create'}</Button>
            </Box>
        </form>
    );
};

export default ProductForm;
