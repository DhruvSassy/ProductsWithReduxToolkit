import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IconButton, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { GoogleLogout } from '@leecheuk/react-google-login';

import { reverse } from 'lodash';

import CustomTable from '../../../components/CustomTable';
import InputBox from '../../../components/InputBox';
import ButtonBox from '../../../components/ButtonBox';
import CommonPagination from '../../../components/CommonPagination';
import { addToCart, deleteProduct } from '../../../redux/action';
import NotiStackComponent from '../../../components/NotiStackComponent';
import GoogleLoginBtn from '../../../components/GoogleLoginBtn';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Dashboard = () => {
  const token = localStorage.getItem('googleIdToken');

  const headCells = [
    {
      id: 'productName',
      numeric: false,
      disablePadding: true,
      label: 'Product Name',
      sort: true,
    },
    {
      id: 'qty',
      numeric: true,
      disablePadding: false,
      label: 'Qty',
      sort: false,
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
      sort: false,
    },
   
   
          {
            id: 'action',
            numeric: true,
            disablePadding: false,
            sort: false,
            label: 'Action',
            render: (row) => (
              <>
                <ButtonBox
                  sx={{
                    marginBottom: '8px',
                    marginRight: '5px',
                    cursor: 'pointer',
                    fontWeight:'bold'
                  }}
                  color="secondary"
                  onClick={() => handleEdit(row.id)}
                  title="Edit"
                />
                <ButtonBox
                  sx={{
                    marginBottom: '8px',
                    marginRight: '5px',
                    cursor: 'pointer',
                    fontWeight:'bold'
                  }}
                  color="secondary"
                  onClick={() => handleDelete(row.id)}
                  title="Delete"
                />
                <ButtonBox
                  sx={{
                    marginBottom: '8px',
                    cursor: 'pointer',
                    fontWeight:'bold'
                  }}
                  color="secondary"
                  onClick={() => handleAddToCart(row.id)}
                  title="Add to Cart"
                />
              </>
            ),
          },
   
  ];

  const [searchProduct, setSearchProduct] = useState('');
  const showPagination = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((productReducer) => productReducer?.product?.cart);

  const user = useSelector((state) => state.product.user);

  const productRow = useSelector(
    (productReducer) => productReducer?.product?.list
  );



  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    orderByField,
    handleRequestSort,
  } = CommonPagination();

  const notiComponent = NotiStackComponent();

  const handleDelete = (id) => {
    if(token) {
    const index = productRow.findIndex((product) => product.id === id);
    dispatch(deleteProduct(id));
    if (visibleRows?.length === 1 && page > 0) {
      setPage(page - 1);
    }
    notiComponent.showSnackbar(
      `${productRow[index]?.productName} product deleted successfully!`,
      'success'
    );
  } else {
    notiComponent.showSnackbar(
      `Please Login !`,
      'error'
    );
  }
  };

  const handleEdit = (id) => {
    if(token){
    navigate(`/edit-product/${id}`);
    localStorage.setItem('page', page);
  } else {
    notiComponent.showSnackbar(
      `Please Login !`,
      'error'
    );
  }
  };

  const handleAddToCart = (id) => {
    const isExist = cart.find((rec) => rec.id === id);

    if (isExist) {
      notiComponent.showSnackbar(
        `${isExist?.productName} product already add in cart!`,
        'error'
      );
    } else if (!token) {
      notiComponent.showSnackbar(
        `Please Login !`,
        'error'
      );
    }else {
      const productToAdd = productRow.find((product) => product.id === id);
      const productWithInitialCount = { ...productToAdd, count: 1 };
      dispatch(addToCart([productWithInitialCount]));
      notiComponent.showSnackbar(
        `${productToAdd?.productName} product add to cart successfully!`,
        'success'
      );
    }
  };

  const handleOnclick = () => {
    if(token){
    localStorage.setItem('page', '0');
    setPage(0);
    navigate('/add-product');
  } else {
    notiComponent.showSnackbar(
        `Please Login !`,
        'error'
      );
  }
  };

  const handleSearchChange = (event) => {
    setSearchProduct(event.target.value);
    setPage(0);
  };

  const handleOnCart = () => {
    navigate('/cartPage');
  };

  //aapde serach kari e "productName" wise te serach kare and aakhi row aave and productData array mathi data aave
  const filteredRows = productRow.filter((row) =>
    row.productName.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const reversedRows = reverse(filteredRows);

  const visibleRows = reversedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const logout = (res) => {
    localStorage.removeItem('googleIdToken','token');
    localStorage.removeItem('userName' && user?.username);
    navigate('/signIn');
    notiComponent.showSnackbar(`LogOut successfully!`, 'success');
  };

  const loginHandler = () => {
    navigate("/signIn")
  }

  const userName = localStorage.getItem('userName');

  return (
    <div style={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          backgroundColor: 'lightblue',
        }}
      >
        {token ? <p style={{color:"brown",fontWeight:'bold'}}>Welcome,{ userName || user?.username }!</p> : null}
        <ButtonBox
          color="secondary"
          onClick={handleOnclick}
          title="AddProduct"
          sx={{ marginLeft: '10px',fontWeight:'bold' }}
        />
        <SearchIcon sx={{ marginLeft: '55%', color: 'blue' }} />
        <InputBox
          type="search"
          placeholder="Search Product"
          value={searchProduct}
          onChange={handleSearchChange}
          sx={{ color: 'white', marginRight: '29px',fontWeight:'bold' }}
        />
        {token ? (
          <>
            {' '}
            <IconButton
              aria-label="cart"
              sx={{ marginLeft: '2%', marginRight: '2%' }}
            >
              <StyledBadge badgeContent={cart?.length} color="secondary">
                <ShoppingCartIcon onClick={handleOnCart} />
              </StyledBadge>
            </IconButton>
            <ButtonBox
              color="warning"
              onClick={logout}
              title="LogOut"
              sx={{ marginLeft: '3px' ,color:"bedge",fontWeight:'bold'}}
            />
          </>
        ) : (
          <ButtonBox
          color="warning"
          onClick={loginHandler}
          title="Please Login!"
          sx={{ marginLeft: '3px',fontWeight:'bold' }}
        />
        )}
      </Toolbar>
      <CustomTable
        headCells={headCells}
        row={visibleRows}
        order={order}
        orderByField={orderByField}
        onRequestSort={handleRequestSort}
        page={page}
        setPage={setPage}
        count={filteredRows.length}
        handleChangePage={handleChangePage}
        rowsPerPageOptions={[2, 10, 20]}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        showPagination={showPagination}
      />
    </div>
  );
};

export default Dashboard;
