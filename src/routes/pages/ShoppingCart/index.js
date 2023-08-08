import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { Alert, Snackbar } from '@mui/material';

import { deleteToCart } from '../../../redux/action';
import InputBox from '../../../components/InputBox';

import './index.css';


function Header({ onCloseCart }) {
  return (
    <header
      className="container"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <h1 style={{ flex: 1 }}>Shopping Cart</h1>
      <div className="remove">
        <svg className="close" onClick={onCloseCart}>
          <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
        </svg>
      </div>
    </header>
  );
}

function ShoppingCart() {
  const cartData = useSelector((state) => state.product.cart);
  const productData = useSelector((state) => state.product.list);
  const productQty = productData.map((product) => product.qty);

  console.log('QTY:', cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialProducts = cartData.map((product) => ({
    ...product,
    count: 1, // Or use the default count value
  }));

  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);

  const onRemoveProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    dispatch(deleteToCart(id));
  };



  const onQuantityChange = (index, count) => {
    if (productQty[index] < count) {
      setOpen(true);
    } else if (count >= 0) {
      products[index].count = parseInt(count);
      setProducts([...products]);
    }
  };

  const HandleHome = () => {
    navigate('/');
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return products.length > 0 ? (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{ marginTop: 1000 }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          This product is Out of Stock!
        </Alert>
      </Snackbar>
      <Header onCloseCart={HandleHome} />
      <section className="container">
        <ul className="products">
          {products.map((product, index) => (
            <li className="row" key={index}>
              <div className="col left">
                <div className="detail">
                  <div className="name">{product.productName}</div>
                  <div className="price">{formatCurrency(product.price)}</div>
                </div>
              </div>
              <div className="col right">
                <div className="quantity">
                  <div className="quantity-container">
                    <IndeterminateCheckBoxRoundedIcon
                      className="indeterminate-icon"
                      onClick={() => onQuantityChange(index, product.count - 1)}
                    />
                    <InputBox
                      type="text"
                      className="quantity-input"
                      // step="1"
                      value={product.count}
                      defaultValue={1}
                      onChange={(event) => {
                        onQuantityChange(index, event.target.value);
                      }}
                      disabled
                    />
                    <AddBoxRoundedIcon
                      className="add-icon"
                      onClick={() => onQuantityChange(index, product.count + 1)}
                    />
                  </div>
                </div>

                <div className="remove">
                  <svg
                    version="1.1"
                    className="close"
                    x="0px"
                    y="0px"
                    viewBox="0 0 60 60"
                    enableBackground="new 0 0 60 60"
                    onClick={() => onRemoveProduct(product.id)}
                  >
                    <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  ) : (
    <div className="empty-product">
      <h3>There are no products in your cart.</h3>
      <button onClick={HandleHome}>Shop now</button>
    </div>
  );
}

function formatCurrency(value) {
  return Number(value).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
}

export default ShoppingCart;
