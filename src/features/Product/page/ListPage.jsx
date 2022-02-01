import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductSkeletonList from '../components/ProductSkeletonList';
import queryString from 'query-string';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductFilters from '../components/ProuductFilter';
import FilterViewer from '../components/FilterViewer';
import createTypography from '@mui/material/styles/createTypography';

ListPage.propTypes = {};

function ListPage(props) {
  const navigative = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({ limit: 9, total: 10, page: 1 });
  const [filter, setfilter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    navigative({ pathname: location.pathname, search: queryString.stringify(filters) });
  };
  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    navigative({ pathname: location.pathname, search: queryString.stringify(filters) });
  };

  const setNewFilters = (newFilters) => {
    navigative({ pathname: location.pathname, search: queryString.stringify(newFilters) });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          {/* leff */}
          <Grid item xs md={4}>
            <Paper elevation={1}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          {/* right */}
          <Grid item xs={12} md>
            <Paper elevation={1}>
              {/* <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} /> */}
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}
            </Paper>
            <Box
              width="100%"
              sx={{ diplay: 'flex', flexFlow: 'row nowrap', alignItems: 'center', my: '10px', py: '10px' }}
            >
              <Pagination
                sx={{ py: '5px' }}
                color="primary"
                page={pagination.page}
                count={Math.ceil(pagination.total / pagination.limit)}
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
