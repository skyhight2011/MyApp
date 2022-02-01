import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemButton, Typography } from '@mui/material';
import categoryApi from '../../../../api/categoryApi';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({});

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="subtitle1">DANH MỤC SẢN PHẨM</Typography>
        <List>
          {categoryList.map((category) => (
            <ListItemButton key={category.id}>
              <ListItem key={category.id} onClick={() => handleCategoryClick(category)}>
                <Typography variant="body1">{category.name}</Typography>
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
}

export default FilterByCategory;
