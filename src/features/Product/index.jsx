import { Box, Typography } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import DetailPage from './page/DetailPage';
import ListPage from './page/ListPage';

function ProductFeature(props) {
  return (
    <Box sx={{ pt: 2 }}>
      <Routes>
        <Route path="/*" element={<ListPage />}></Route>
        <Route path=":productId/*" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default ProductFeature;
