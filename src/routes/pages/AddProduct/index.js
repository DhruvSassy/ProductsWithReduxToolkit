import React, { useState } from 'react'
import InputBox from '../../../components/InputBox'
import { Box, Button } from '@mui/material';
import ButtonBox from '../../../components/ButtonBox';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: '',
        qty: '',
        price: '',
      });
      const [errorText, setErrorText] = useState({});

      const handleCancel = () => {
        navigate('/')
      };
      
      const handleAddProduct = () => {
        let isError = false;
        const error = {};
        if (product.productName === "") {
          error.productName = "Please Enter Product Name";
          isError = true;
        } else if (!/^[.@&]?[a-zA-Z0-9 ]+[!.@&()]?[a-zA-Z0-9!()]+/.test(product.productName)) {
          error.product = "Please valid Product Name";
          isError = true;
        } else {
          error.product = "";
        }
    
        if (product.price === "") {
          error.price = "Please Enter Product Price";
          isError = true;
        } else if (product.price === 0) {
          error.price = "Please valid Product Price";
          isError = true;
        } else {
          error.price = " ";
        }
    
        if (product.qty === "") {
          error.qty = "Please Enter Product Quantity";
          isError = true;
        } else if (product.qty === 0) {
          error.qty = "Please valid Product Quantity";
          isError = true;
        } else {
          error.qty = " ";
        }
        setErrorText({ ...error });
        return isError;
      }
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto' }}>
        <InputBox
            name="name"
            label="Product Name"
            value={product.productName}
            onChange={(e)=>setProduct(e.target.value)}
            error={!!errorText.productName}
            helperText={errorText.productName}
            />
             <InputBox
            name="qty"
            label="Product Quantity"
            value={product.qty}
            onChange={(e)=>setProduct(e.target.value)}
            error={!!errorText.qty}
            helperText={errorText.qty}
            />
                <InputBox
            name="price"
            label="Product Price"
            value={product.price}
            onChange={(e)=>setProduct(e.target.value)}
            error={!!errorText.price}
            helperText={errorText.price}
            />
             <div sx={{ maxWidth: 400, margin: '0 auto' }}>
            <ButtonBox   onClick={handleAddProduct} />
            <Button onClick={handleCancel} variant="contained" sx={{marginTop:'1.5%'}}>
              Cancel
            </Button>
        </div>
        </Box>
  )
}

export default AddProduct