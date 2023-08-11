import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from '../../../redux/action';

import InputBox from '../../../components/InputBox';
import ButtonBox from '../../../components/ButtonBox';
import NotiStackComponent from '../../../components/NotiStackComponent';

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [errorText, setErrorText] = useState({});

  const products = useSelector(
    (productReducer) => productReducer?.product?.list
  );
    console.log("products.productName",products.productName)
  //aapde je product edit karvani hoi e product na data aave
  const productToEdit = products?.find((product) => product?.id === id);
  console.log('productToEdit', productToEdit);

  const notiComponent = NotiStackComponent();

  //edit par click karie tyare input box ma data aave
  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.productName || '');
      setQty(productToEdit.qty || '');
      setPrice(productToEdit.price || '');
    }
  }, [productToEdit]);

  const handleCancel = () => {
    navigate('/');
  };

  const existingProduct = products.find(
    (product) =>
      product.productName.toLowerCase() === productName.toLowerCase() &&
      product.id !== id
  );

  const validate = () => {
    let isError = false;
    const errors = {};
  
    if (!productName.trim()) {
      errors.productName = 'Please Enter Product Name';
      isError = true;
    } else if (existingProduct) {
      errors.productName = 'Product with this name already exists';
      isError = true;
    } else if (productName.includes(' ')) {
      errors.productName = 'Product name cannot contain spaces';
      isError = true;
    }
  
    if (!qty.trim()) {
      errors.qty = 'Please Enter Product Quantity';
      isError = true;
    } else if (!/^\d+$/.test(qty)) {
      errors.qty = 'Please Enter a valid numeric Quantity';
      isError = true;
    }
  
    if (!price.trim()) {
      errors.price = 'Please Enter Product Price';
      isError = true;
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) { 
      errors.price = 'Please Enter a valid numeric price';
      isError = true;
    }
  
    setErrorText(errors);
    return {
      errors,
      isError,
    };
  };
  
  const handleAddProduct = () => {
    const validationResult = validate();

    if (!validationResult.isError) {
      const newProduct = {
        id: `${Date.now()}`,
        productName,
        qty,
        price,
      };
      dispatch(addProduct(newProduct));
      navigate('/');
      notiComponent.showSnackbar(`${productName} product added successfully!`, 'success');
    }
  };

  const handleEditProduct = () => {
    const validationResult = validate();

    if (!validationResult.isError) {
      const newProduct = {
        id,
        productName,
        qty,
        price,
      };
      dispatch(editProduct(newProduct));
      navigate('/');
      notiComponent.showSnackbar(`${productName} product edited successfully!`, 'success');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <InputBox
        name="name"
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        error={errorText.productName}
        helperText={errorText.productName}
      />
      <InputBox
        name="qty"
        label="Product Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        error={errorText.qty}
        helperText={errorText.qty}
      />
      <InputBox
        name="price"
        label="Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        error={errorText?.price}
        helperText={errorText?.price}
      />
      <div sx={{ maxWidth: 400, margin: '0 auto' }}>
        {id ? (
          <ButtonBox
            sx={{ marginTop: '1.5%' }}
            onClick={handleEditProduct}
            title="Update Product"
          />
        ) : (
          <ButtonBox
            onClick={handleAddProduct}
            title="Add Product"
            sx={{ marginTop: '1.5%' }}
          />
        )}
        <ButtonBox
          onClick={handleCancel}
          title="Cancel"
          sx={{ marginTop: '1.5%' }}
        ></ButtonBox>
      </div>
    </Box>
  );
};

export default AddProduct;
