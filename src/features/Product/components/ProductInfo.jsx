import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../../utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ paddingBottom: '16px', borderBottom: `1px solid #cfd8dc` }}>
        <Typography component="h1" variant="h4">
          {name}
        </Typography>

        <Typography sx={{ mr: theme.spacing(2), fontSize: '16px', fontWeight: 'bold' }} variant="body2">
          {`${shortDescription.slice(100)}\u2026`}
        </Typography>

        <Box sx={{ p: '16px', m: '8px 0', backgroundColor: '#cfd8dc' }}>
          <Box component="span" sx={{ fontSize: '46px', mr: '32px' }}>
            {formatPrice(salePrice)}
          </Box>

          {promotionPercent > 0 && (
            <>
              <Box component="span" sx={{ fontSize: '16px' }}>
                {formatPrice(originalPrice)}
              </Box>

              <Box component="span" sx={{ ml: '16px' }}>{`-${promotionPercent}%`}</Box>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ProductInfo;
