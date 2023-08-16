import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { GoogleLogout } from '@leecheuk/react-google-login';
import GoogleLoginBtn from '../GoogleLoginBtn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  

const Navbar = (props) => {
const {title,placeholder,type,token,badgeContent,onClick,onLogoutSuccess} = props;
   return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
           
            <StyledInputBase
              placeholder={placeholder}
              type={type}
              inputProps={{ 'aria-label': 'search' }}
            />
         
          </Search>
          {token ? (
          <>
            {' '}
            <IconButton
              aria-label="cart"
              sx={{ marginLeft: '2%', marginRight: '2%' }}
            >
              <StyledBadge badgeContent={badgeContent} color="secondary">
                <ShoppingCartIcon onClick={onClick} />
              </StyledBadge>
            </IconButton>
            <GoogleLogout
              clientId="242716011984-oordacustqqj5b3erur8en7b0vdo4q3k.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={onLogoutSuccess}
            />
          </>
        ) : (
          <GoogleLoginBtn
            buttonText="Please Login"
            cookiePolicy={'single_host_origin'}
            prompt={'select_account'}
          />
        )}        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar