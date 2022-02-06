import React from 'react';
import PropTypes from 'prop-types';
import { Box, CardMedia, Typography } from '@mui/material';
import { THUMBNAIL_PLACEHOLDER } from '../../../../constants/index';
import cartSlice from '../../cartSlice';

CartItem.propTypes = {};

function CartItem(props) {
  const thumbnailUrl = THUMBNAIL_PLACEHOLDER;
  const cartItems = 
  console.log(thumbnailUrl);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <CardMedia component="img" sx={{ maxWidth: '80px', ml: '15px' }} src={thumbnailUrl} />
      <h3>item title</h3>
      <Typography sx={{ my: 'auto' }}>Item Price</Typography>
    </Box>
  );
}

export default CartItem;
