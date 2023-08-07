import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteToCart } from '../../../redux/action';

function Header() {
  const navigate = useNavigate();

  const onCloseCart = () => {
    navigate('/');
  };
  
  return (
    <header className="container" style={{ display: 'flex', alignItems: 'center' }}>
      <h1 style={{ flex: 1 }}>Shopping Cart</h1>
     
      <div className="remove">
        <svg
          onClick={onCloseCart}
          version="1.1"
          className="close"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          enableBackground="new 0 0 60 60"
        >
          <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
        </svg>
      </div>
    </header>
  );
  
}



function Page() {
  const cartData = useSelector((state) => state.product.cart);
  console.log("cartData:", cartData);

    // // Use the useEffect hook to update the products state when cartData changes
    // useEffect(() => {
    //   setProducts(cartData);
    // }, [cartData]);
  const [products, setProducts] = useState(cartData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeProductQuantity = (index, event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts = [...products];

    // Minimum quantity is 1, maximum quantity is 100, can be left blank to input easily
    if (value === '') {
      cloneProducts[index].qty = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].qty = valueInt;
    }

    setProducts(cloneProducts);
  };

  const onRemoveProduct = (id) => {
    dispatch(deleteToCart(id));
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };
  
  const HandleHome = () => {
    navigate('/');
  };

  return products.length > 0 ? (
    <div>
      <Header />
      <section className="container">
      <ul className="products">
        {products.map((product, index) => {
          return (
            <li className="row" key={index}>
              <div className="col left">
                <div className="detail">
                  <div className="name">{product.productName}</div>
                  <div className="price">{formatCurrency(product.price)}</div>
                </div>
              </div>
              <div className="col right">
                <div className="quantity">
                  <input
                    type="text"
                    className="quantity"
                    step="1"
                    value={product.qty}
                    onChange={(event) => onChangeProductQuantity(index, event)}
                  />
                </div>
                <div className="remove">
                  <svg
                    onClick={() => onRemoveProduct(product.id)} 
                     version="1.1"
                    className="close"
                    x="0px"
                    y="0px"
                    viewBox="0 0 60 60"
                    enableBackground="new 0 0 60 60"
                  >
                    <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                  </svg>
                </div>
              </div>
            </li>
          );
        })}
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


export default Page;
