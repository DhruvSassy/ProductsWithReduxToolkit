import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../redux/action';

import { Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';


import { reverse } from 'lodash';

import CustomTable from '../../../components/CustomTable';
import InputBox from '../../../components/InputBox';
import ButtonBox from '../../../components/ButtonBox';

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
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'Action',
      render: (row) => (
        <>
          <EditIcon onClick={() => handleEdit(row.id)} />
          <DeleteIcon onClick={() => handleDelete(row.id)} />
        </>
      ),
    },
  ];

  const [order, setOrder] = useState('asc');
  const [orderByField, setOrderByField] = useState('');
  const [page, setPage] = useState(
    Math.max(0, localStorage.getItem('page') ?? 0)
  );
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchProduct, setSearchProduct] = useState('');
  const showPagination = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productRow = useSelector(
    (productReducer) => productReducer?.product?.list
  );

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    if (visibleRows?.length === 1 && page > 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

  const handleRequestSort = (property) => {
    const isAsc = orderByField === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderByField(property);
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);

    // setPage(page)
  };

  const handleOnclick = () => {
    navigate('/add-product');
  };

  const handleSearchChange = (event) => {
    setSearchProduct(event.target.value);
    setPage(0);
  };

  //aapde serach kari e "productName" wise te serach kare and aakhi row aave and productData array mathi data aave
  const filteredRows = productRow.filter((row) =>
    row.productName.toLowerCase().includes(searchProduct.toLowerCase())
  );
  console.log('filteredRows', filteredRows);

  const reversedRows = reverse(filteredRows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = reversedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // useEffect(() => {
  //   if (visibleRows?.length === 0 && page > 0) {
  //     setPage(page - 1);
  //   }
  // }, [visibleRows, page]);

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
