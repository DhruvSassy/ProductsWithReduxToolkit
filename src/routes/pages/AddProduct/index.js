import React, { useState } from 'react'
import InputBox from '../../../components/InputBox'
import { Box, Button } from '@mui/material';
import ButtonBox from '../../../components/ButtonBox';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addproduct } from '../../../redux/action';

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
      const [errorText, setErrorText] = useState({});

      const handleCancel = () => {
        navigate('/')
      };
      
      const Validate = () => {
        let isError = false;
        const error = {};
        if (productName === "") {
          error.productName = "Please Enter Product Name";
          isError = true;
        } else if (!/^[.@&]?[a-zA-Z0-9 ]+[!.@&()]?[a-zA-Z0-9!()]+/.test(productName)) {
          error.product = "Please valid Product Name";
          isError = true;
        } else {
          error.product = "";
        }
    
        // if (product.price === "") {
        //   error.price = "Please Enter Product Price";
        //   isError = true;
        // }
        //  else {
        //   error.price = " ";
        // }
    
        // if (product.qty === "") {
        //   error.qty = "Please Enter Product Quantity";
        //   isError = true;
        // } 
        // else {
        //   error.qty = " ";
        // }
        setErrorText({ ...error });
        return isError;

      
      }
      const handleAddProduct = () => {
        const validationResult = Validate();

        if (!validationResult.isError) {
          const newProduct = {
            productName,
            qty,
            price,
          };
          dispatch(addproduct(newProduct))
        }
        navigate('/');
      }
      
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto' }}>
        <InputBox
            name="name"
            label="Product Name"
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
            error={!!errorText.productName}
            helperText={errorText.productName}
            />
             <InputBox
            name="qty"
            label="Product Quantity"
            value={qty}
            onChange={(e)=>setQty(e.target.value)}
            error={!!errorText.qty}
            helperText={errorText.qty}
            />
                <InputBox
            name="price"
            label="Product Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
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