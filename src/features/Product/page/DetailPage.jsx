import { Box, Container, Grid, LinearProgress, Paper } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../Cart/cartSlice';
import AddToCartForm from '../components/AddToCardForm';
import ProductAdditional from '../components/ProductAdditonal';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReview from '../components/ProductReview';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

function DetailPage(props) {
  const params = useParams();
  const location = useLocation();

  const navigative = useNavigate();
  const { productId } = useParams();

  const { product, loading } = useProductDetail(productId);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box>
        <LinearProgress sx={{ position: 'fixed', top: 1, left: 0, width: '100%' }} />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
  };

  return (
    <Box>
      <Container spacing={1}>
        <Paper elevation={1}>
          <Grid container>
            {/* left */}
            <Grid item sx={{ width: '400px', py: '5px', px: '5px', borderRight: `1px solid grey` }}>
              <ProductThumbnail product={product} />
            </Grid>

            {/* right */}
            <Grid item sx={{ flex: '1 1 0', py: '10px', px: '5px' }}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Routes>
          <Route path="/*" element={<ProductDescription product={product} />}></Route>
          <Route path="/reviews" element={<ProductReview />}>
            product reviews
          </Route>
          <Route path="/additional" element={<ProductAdditional />}>
            product Description
          </Route>
        </Routes>
      </Container>
    </Box>
  );
}

export default DetailPage;
