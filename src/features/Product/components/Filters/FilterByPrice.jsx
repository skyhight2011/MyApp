import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(values);

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Paper elevation={1} sx={{ my: '5px', mx: '15px' }}>
      <Typography sx={{ p: 1 }} variant="subtitle1">
        Range Value
      </Typography>
      <Box sx={{ display: 'flex', flexFlow: ' row nowrap', alignItems: 'center' }}>
        <TextField
          size="small"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <Typography component="span" sx={{ fontSize: '30px', mx: '10px' }}>
          -
        </Typography>
        <TextField
          size="small"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>
      <Button sx={{ my: 1 }} variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        submit
      </Button>
    </Paper>
  );
}

export default FilterByPrice;
