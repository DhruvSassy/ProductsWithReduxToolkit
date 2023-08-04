import  { useState } from 'react';

const CommonPagination = () => {
  const [page, setPage] = useState(
    Math.max(0, localStorage.getItem('page') ?? 0)
  );
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [order, setOrder] = useState('asc');
  const [orderByField, setOrderByField] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderByField === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderByField(property);
  };

  

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    setOrder,
    orderByField,
    setOrderByField,
    handleRequestSort,
  };
};

export default CommonPagination;
