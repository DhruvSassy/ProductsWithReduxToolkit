import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductData from '../../../components/ProductData';
import { deleteProduct } from '../../../redux/action';
import InputBox from '../../../components/InputBox';
import SearchIcon from '@mui/icons-material/Search';
import ButtonBox from '../../../components/ButtonBox';
import { Toolbar } from '@mui/material';

const Dashboard = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState('');

  const productRow = useSelector((productReducer) => productReducer);
  const productData = productRow?.product?.list;

  const handleDelete = (id) => {
    // deleted item no index sodhe
    const indexToDelete = productData.findIndex((row) => row.id === id);
    console.log('indexToDelete::', indexToDelete);

    // aa page ma na productData array mathi delete kare che
    if (indexToDelete !== -1) {
      const updatedRowData = [...productData];
      updatedRowData.splice(indexToDelete, 1);
      console.log('updatedRowData::', updatedRowData);

      dispatch(deleteProduct(id));

      // product delete thya pachi page Calculate kare
      const updatedNumPages = Math.ceil(updatedRowData.length / rowsPerPage);
      console.log('updatedNumPages:', updatedNumPages);

      // product delete thya pachi last page check kare
      if (updatedNumPages < page + 1) {
        // last page hoi to ena agadi na page par mokle
        setPage((prevPage) => Math.max(prevPage - 1, 0));
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleOnclick = () => {
    navigate('/add-product');
  };

  const handleSearchChange = (event) => {
    setSearchProduct(event.target.value);
    // Page ne 1st set kare
    setPage(0);
  };

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
        />{' '}
        <SearchIcon sx={{ marginLeft: '60%' }} />
        <InputBox
          type="search"
          placeholder="Search Product"
          value={searchProduct}
          onChange={handleSearchChange}
        />
      </Toolbar>
      <ProductData
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        selected={selected}
        setSelected={setSelected}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        searchProduct={searchProduct}
        handleSearchChange={handleSearchChange}
        productData={productData}
      />
    </div>
  );
};

export default Dashboard;
