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

import { reverse } from 'lodash';

import CustomTable from '../../../components/CustomTable';
import InputBox from '../../../components/InputBox';
import ButtonBox from '../../../components/ButtonBox';
import CommonPagination from '../../../components/CommonPagination';
import { addToCart, deleteProduct } from '../../../redux/action';
import SnackBar from '../../../components/SnackBar';

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
  const [open, setOpen] = useState(false);
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

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    if (visibleRows?.length === 1 && page > 0) {
      setPage(page - 1);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
    localStorage.setItem('page', page);
  };

  const handleAddToCart = (id) => {
    const isExist = cart.some((rec) => rec.id === id);

    if (isExist) {
      setOpen(true);
    } else {
      const productToAdd = productRow.find((product) => product.id === id);
    const productWithInitialCount = { ...productToAdd, count: 1 }; 
    dispatch(addToCart([productWithInitialCount]));
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

  return (
    <div style={{ margin: '1%' }}>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
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
    <IconButton aria-label="cart" sx={{marginLeft:'6%'}}>
      <StyledBadge badgeContent={cart?.length} color="secondary">
        <ShoppingCartIcon  onClick={handleOnCart}/>
      </StyledBadge>
    </IconButton>
      </Toolbar>
       <SnackBar
        open={open}
        setOpen={setOpen}
        title=" This product already add in cart!"
        severity='error'
      />
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
