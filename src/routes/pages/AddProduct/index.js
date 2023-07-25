import React, { useEffect, useState } from 'react'
import InputBox from '../../../components/InputBox'
import { Box, Button } from '@mui/material';
import ButtonBox from '../../../components/ButtonBox';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addproduct, editProduct } from '../../../redux/action';

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [errorText, setErrorText] = useState({});
  
  const products = useSelector((tableReducer) => tableReducer?.table?.rows); 
//aapde je product edit karvani hoi e product na data aave 
  const productToEdit = products?.find((product) => product?.id === id);
  console.log("productToEdit",productToEdit) 

  //edit par click karie tyare input box ma data aave
  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.productName || '');
      setQty(productToEdit.qty || '');
      setPrice(productToEdit.price || '');
    }
  }, [productToEdit]);

  const handleCancel = () => {
    navigate('/')
  };

  const validate = () => {
    let isError = false;
    const errors = {};
    if (!productName) {
      errors.productName = "Please Enter Product Name";
      isError = true;
    } 

    if (!price) {
      errors.price = "Please Enter Product Price";
      isError = true;
    }
     
    if (!qty) {
      errors.qty = "Please Enter Product Quantity";
      isError = true;
    } 
    
    setErrorText(errors);
    return {
      errors,
      isError,
    };


  }
  const handleAddProduct = () => {
    const validationResult = validate();

    if (!validationResult.isError) {
      const newProduct = {
        id: `${Date.now()}`,
        productName,
        qty,
        price,
      };
      dispatch(addproduct(newProduct))
      navigate('/');
    }
  }

  const handleEditProduct = () => {
    const validationResult = validate();

    if (!validationResult.isError) {
      const newProduct = {
        id,
        productName,
        qty,
        price,
      };
      dispatch(editProduct(newProduct))
      
      navigate('/');
    }
  }

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto' }}>
      <InputBox
        name="name"
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        error={!!errorText.productName}
        helperText={errorText.productName}
      />
      <InputBox
        name="qty"
        label="Product Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        error={!!errorText.qty}
        helperText={errorText.qty}
      />
      <InputBox
        name="price"
        label="Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        error={!!errorText?.price}
        helperText={errorText?.price}
      />
      <div sx={{ maxWidth: 400, margin: '0 auto' }}>
        {id ? <Button variant="contained" sx={{ marginTop: '1.5%', marginRight: '1%' }} onClick={handleEditProduct} >Update Product </Button> :
          <ButtonBox onClick={handleAddProduct} />
        }

        <Button onClick={handleCancel} variant="contained" sx={{ marginTop: '1.5%' }}>
          Cancel
        </Button>
      </div>
    </Box>
  )
}

export default AddProduct