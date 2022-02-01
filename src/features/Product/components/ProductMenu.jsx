import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

ProductMenu.propTypes = {};

function ProductMenu(props) {
  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        listStyle: 'none',
        '& > li': {
          padding: '16px',
        },

        '& > li > a': {
          color: '#455a64',
          cursor: 'pointer',
          textDecoration: 'none',
        },

        '& > li > a.active': {
          color: '#0d47a1',
          textDecoration: 'underline',
        },
      }}
    >
      <li>
        <Link to="">Description</Link>
      </li>

      <li>
        <Link to="additional">Additional Information</Link>
      </li>

      <li>
        <Link to="reviews">Reviews</Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
