import { ShoppingCart } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Dialog, DialogContent } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/Selector';

const theme = createTheme({});
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigative = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const loggedInUser = useSelector((state) => state.user.current);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const isLoggedIn = loggedInUser.id;
  const cartItemsCount = useSelector(cartItemsCountSelector);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOutClick = () => {
    console.log('logout clicked');
    const action = logout();
    dispatch(action);
    handleCloseUserMenu();
  };

  const handleProfileClick = () => {};

  const handleCartClick = () => {
    navigative('cart');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Link className={classes.link} textDecoration="none" to="/">
                MYAPP
              </Link>
            </Typography>
            {/* menu responsive */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  marginTop: '2px',
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <NavLink className={classes.link} to="/products">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Products</Typography>
                  </MenuItem>
                </NavLink>
              </Menu>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <NavLink className={classes.link} to="/">
                MY APP
              </NavLink>
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              {!isLoggedIn && (
                <Tooltip title="Login / Sign In">
                  <IconButton
                    onClick={handleClickOpen}
                    variant="contained"
                    sx={{ borderRadius: '5px', color: 'inherit' }}
                  >
                    Login
                  </IconButton>
                </Tooltip>
              )}
              {isLoggedIn && (
                <IconButton onClick={handleUserClick} sx={{ fontSize: '24px' }}>
                  <AccountCircleIcon src="../../img/152662504_1123152228135929_330945116565781993_n.jpg" />
                </IconButton>
              )}
              <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
                <Badge badgeContent={cartItemsCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Typography textAlign="center">my account</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOutClick}>
                  <Typography textAlign="center">log out</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Dialog
              onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                  handleClose();
                }
              }}
              disableEscapeKeyDown
              open={open}
              aria-labelledby="form-dialog-title"
            >
              <IconButton
                sx={{ borderRadius: '5px', position: 'absolute', top: theme.spacing(1), right: theme.spacing(2) }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent>
                {mode === MODE.REGISTER && (
                  <>
                    <Register closeDialog={handleClose} />

                    <Box textAlign="center">
                      <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                        Already have an account. Login here
                      </Button>
                    </Box>
                  </>
                )}
                {mode === MODE.LOGIN && (
                  <>
                    <Login closeDialog={handleClose} />

                    <Box textAlign="center">
                      <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                        Dont have an account. Register here
                      </Button>
                    </Box>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
