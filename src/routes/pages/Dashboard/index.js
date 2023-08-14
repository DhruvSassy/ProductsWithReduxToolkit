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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Dashboard = () => {
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
      sort:false,
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
      sort:false,
    },
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      sort:false,
      label: 'Action',
      render: (row) => (
        <>
          <EditIcon onClick={() => handleEdit(row.id)} />
          <DeleteIcon onClick={() => handleDelete(row.id)} />
          <ButtonBox sx={{backgroundColor:'black',color:'white'}} onClick={()=>handleAddToCart(row.id)} title='Add to Cart' />
        </>
      ),
    },
  ];

  const [searchProduct, setSearchProduct] = useState('');
  const showPagination = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();

const cart = useSelector((productReducer)=>productReducer?.product?.cart)
console.log("cart:",cart);

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
    const index = productRow.findIndex((product) => product.id === id);
    dispatch(deleteProduct(id));
    if (visibleRows?.length === 1 && page > 0) {
      setPage(page - 1);
    }
    notiComponent.showSnackbar(`${productRow[index]?.productName} product deleted successfully!`, 'success');
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
    localStorage.setItem('page', page);
  };

  const handleAddToCart = (id,index) => {
    const isExist = cart.find((rec) => rec.id === id);
   
    if (isExist) {
      notiComponent.showSnackbar(`${isExist?.productName} product already add in cart!`, 'error');
    } else {
      const productToAdd = productRow.find((product) => product.id === id);
    const productWithInitialCount = { ...productToAdd, count: 1 }; 
    dispatch(addToCart([productWithInitialCount]));
    notiComponent.showSnackbar(`${productToAdd?.productName} product add to cart successfully!`, 'success');
    }
  };
  
  const handleOnclick = () => {
    localStorage.setItem('page', '0');
    setPage(0);
    navigate('/add-product');
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
  console.log('filteredRows', filteredRows);

  const reversedRows = reverse(filteredRows);

  const visibleRows = reversedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const logout = (res) => {
    localStorage.removeItem('googleIdToken');
    navigate("/signIn")
    notiComponent.showSnackbar(`LogOut successfully!`, 'success');
  };

 const userName=localStorage.getItem('userName')

  return (
    <div style={{ margin: '1%' }}>
 
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
      <p sx={{marginRight:'6%'}}>Welcome, {userName}!</p>
        <ButtonBox
          onClick={handleOnclick}
          title="Add Product"
          sx={{ marginTop: '1.5%' }}
        />
        <SearchIcon sx={{ marginLeft: '60%' }} />
        <InputBox
          type="search"
          placeholder="Search Product"
          value={searchProduct}
          onChange={handleSearchChange}
        />
    <IconButton aria-label="cart" sx={{marginLeft:'2%',marginRight:'2%'}}>
      <StyledBadge badgeContent={cart?.length} color="secondary">
        <ShoppingCartIcon  onClick={handleOnCart}/>
      </StyledBadge>
    </IconButton>
    <GoogleLogout
      clientId="242716011984-oordacustqqj5b3erur8en7b0vdo4q3k.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
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
