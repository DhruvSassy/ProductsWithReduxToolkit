import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';


import { deleteAllCart, deleteToCart, editCart } from '../../../redux/action';
import InputBox from '../../../components/InputComponent';
import ButtonBox from '../../../components/ButtonComponent';
import Helper from '../../../Helper/INDCurrency';
import NotiStackComponent from '../../../components/NotiStackComponent';

import './index.css';

const Header = ({ onCloseCart }) => {
  return (
    <header
      className='container'
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

const ShoppingCart = () => {
  const cartData = useSelector((state) => state.product.cart);

  const initialProducts = cartData.map((product) => ({
    ...product,
    count: 1,
  }));

  const [products, setProducts] = useState(initialProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notiComponent = NotiStackComponent();

  const onQuantityChange = (index, count) => {
    const productQty = products.map(product => product.qty); 
    if (productQty[index] < count) {
      notiComponent.showSnackbar(`${products[index].productName} product is Out of Stock!`, 'error');
    } else if (count > 0) {
      products[index].count = parseInt(count);
      setProducts([...products]);
      dispatch(editCart(products[index].id, parseInt(count))); 
    }
  };

  const HandleHome = () => {
    navigate('/');
  };

  const onRemoveProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    dispatch(deleteToCart(id));
    notiComponent.showSnackbar("The product has been removed from the cart Successfully!", 'success');
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllCart());
    setProducts([]);
    notiComponent.showSnackbar("Your cart is Empty Successfully!", 'success');
  };



  return products.length > 0 ? (
    <div>
      <Header onCloseCart={HandleHome} />
      <section className="container">
        <ul className="products">
          {products.map((product, index) => (
            <li className="row" key={index}>
              <div className="col left">
                <div className="detail">
                  <div className="name">{product.productName}</div>
                  <div className="price">{Helper(product.price)}</div>
                </div>
              </div>
              <div className="col right">
                <div className="quantity">
                  <div className="quantity-container">
                    <IndeterminateCheckBoxRoundedIcon
                      className="indeterminate-icon"
                      onClick={() => onQuantityChange(index, cartData[index].count - 1)}
                    />
                    <InputBox
                      type="text"
                      className="quantity-input"
                      // defaultValue={1}
                      value={cartData[index].count}
                      onChange={(event) => {
                        onQuantityChange(product.id, parseInt(event.target.value));
                      }}
              
                      disabled
                    />
                    <AddBoxRoundedIcon
                      className="add-icon"
                      onClick={() => onQuantityChange(index, cartData[index].count + 1)}
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
     
      {products.length > 1 ?
      <center><ButtonBox sx={{marginTop:"20px"}} onClick={handleDeleteAll} title="Delete All Products" /> </center>: ''}

    </div>

  ) : (
    <center>
      <div className="empty-product">
      <h3>There are no products in your cart.</h3>
      <ButtonBox
        sx={{
          backgroundColor: '#16cc9b',
          border: '2px solid #16cc9b',
          color: '#ffffff',
          transition: 'all 0.25s linear',
          cursor: 'pointer',
        }}
        onClick={HandleHome}
        title="Shop now"
      />
    </div>
    </center>
  );
}



export default ShoppingCart;
