import React, { useMemo } from 'react';

import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TableSortLabel,Paper} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import _ from 'loadsh'

function sortVisibleRows(list, order, orderBy) {
  console.log("OrderBy::",_.orderBy(list, [orderBy], [order]))
  return _.orderBy(list, [orderBy], [order])
}

const headCells = [
  {
    id: 'productName',
    numeric: false,
    disablePadding: true,
    label: 'Product Name',
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
  },
];

function ProductTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default function ProductData(props) {
  const {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    selected,
    setSelected,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleEdit,
    handleDelete,
    searchProduct,
    productData, 
  } = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'desc';
    setOrder(isAsc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //aapde serach kari e "productName" wise te aakhi row aave and productData array mathi data aave 
  const filteredRows = productData.filter((row) => row.productName.toLowerCase().includes(searchProduct.toLowerCase()));

  const reversedRows = _.reverse(filteredRows);


  const visibleRows = useMemo(() => {
    return sortVisibleRows(reversedRows, order, orderBy).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [ order, orderBy, page, rowsPerPage,reversedRows]);
  console.log("visibleRows:", visibleRows)

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>  
            <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <ProductTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
            />
            {visibleRows.length === 0 ? <p>No Data Found</p> :
              <TableBody>
                {visibleRows.map((visibleRows, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, visibleRows.name)}
                      tabIndex={-1}
                      key={visibleRows.name}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {visibleRows.productName}
                      </TableCell>
                      <TableCell align="right">{visibleRows.qty}</TableCell>
                      <TableCell align="right">{visibleRows.price}</TableCell>
                      <TableCell align="right">
                        <EditIcon onClick={() => handleEdit(visibleRows?.id)} />
                        <DeleteIcon onClick={() => handleDelete(visibleRows?.id)} />
                      </TableCell >
                    </TableRow>
                  );
                })}

              </TableBody>
            }
          </Table>
        </TableContainer>
        {visibleRows.length !== 0 ? 
          <TablePagination
            rowsPerPageOptions={[2, 10, 25]}
            component="div"
            count={productData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> : '' 
        }
      </Paper>
    </Box>
  );
}
