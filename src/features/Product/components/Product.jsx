import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/index';

Product.propTypes = { products: PropTypes.object };

function Product({ product }) {
  const navigative = useNavigate();
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    navigative(`${product.id}`);
  };

  return (
    <Card sx={{ minHeight: '250px', mx: '10px', my: '5px' }} onClick={handleClick}>
      <CardMedia component="img" src={thumbnailUrl} alt={product.name}></CardMedia>
      <CardContent sx={{ minHeight: '65px' }}>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
            {formatPrice(product.salePrice)}
          </Box>
          {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Product;
