import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './Selector';
import { cartItemsCountSelector } from './Selector';
import { Box, Card, CardMedia, Grid, Paper, Typography } from '@mui/material';
import { formatPrice } from '../../utils';
import CartItem from './components/CartItems';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  const cartCount = useSelector(cartItemsCountSelector);
  const { cartOpen, setCartOpen } = useState(false);

  return (
    <Box spacing={2}>
      <Typography variant="subtitle1" sx={{ my: 2 }}>
        Your Cart
      </Typography>
      {cartTotal === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <CartItem />
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={1} sx={{ minHeight: '320px' }}>
              <Typography sx={{ color: 'red', b: '5px' }}>TOTAL: {formatPrice(cartTotal)}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default CartFeature;
