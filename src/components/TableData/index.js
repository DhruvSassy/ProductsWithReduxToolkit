import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ButtonBox from '../ButtonBox';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/action';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
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

function EnhancedTableHead(props) {
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
}


export default function TableData() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState('');



  const tablerow = useSelector((tableReducer) => tableReducer);
  console.log("tablerow", tablerow);
  const rowData = tablerow?.table?.rows;
  console.log("rowdata", rowData);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'desc';
    setOrder(isAsc ? 'asc' : 'desc');
    setOrderBy(property);
  };


  const handleDelete = (id) => {
    // deleted item no index sodhe 
    const indexToDelete = rowData.findIndex((row) => row.id === id);
    console.log("indexToDelete::",indexToDelete)

    // aa page ma na rowData array mathi delete kare che
    if (indexToDelete !== -1) {
      const updatedRowData = [...rowData];
      updatedRowData.splice(indexToDelete, 1);
      console.log("updatedRowData::",updatedRowData)

      dispatch(deleteProduct(id));


      // product delete thya pachi page Calculate kare 
      const updatedNumPages = Math.ceil(updatedRowData.length / rowsPerPage);
      console.log("updatedNumPages:",updatedNumPages)

      // product delete thya pachi last page check kare
      if (updatedNumPages < page + 1) {
        // last page hoi to ena agadi na page par mokle 
        setPage((prevPage) => Math.max(prevPage - 1, 0));
      }
    }
  };



  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`)
  }


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

  const handleonclick = () => {
    navigate('/add-product');
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;



  const handleSearchChange = (event) => {
    setSearchProduct(event.target.value);
    //Page ne 1st set kare 
    setPage(0);
  };

  //aapde serach kari e "productName" wise te aakhi row aave
  const filteredRows = rowData.filter((row) => row.productName.toLowerCase().includes(searchProduct.toLowerCase()));

  const reversedRows = filteredRows.reverse();

  const visibleRows = useMemo(() =>
    stableSort(reversedRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, reversedRows, rowsPerPage],
  );
  console.log("visibleRows:", visibleRows)

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <ButtonBox onClick={handleonclick}>Add Product</ButtonBox>

          <SearchIcon sx={{ marginLeft: '60%' }} />
          <TextField type="search" placeholder="Search Product" value={searchProduct} onChange={handleSearchChange} />
        </Toolbar>        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
            />
            {visibleRows.length === 0 ? <p>No Data Found</p> :
              <TableBody>
                {visibleRows.map((visibleRows, index) => {
                  const isItemSelected = isSelected(visibleRows.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (

                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, visibleRows.name)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={visibleRows.name}
                      selected={isItemSelected}
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
        {visibleRows.length === 0 ? '' :
          <TablePagination
            rowsPerPageOptions={[2, 10, 25]}
            component="div"
            count={rowData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      </Paper>
    </Box>
  );
}
