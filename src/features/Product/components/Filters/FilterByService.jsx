import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  list: {
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'row wrap',
  },
});

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    console.log(checked);
    onChange({ [name]: checked });
  };
  return (
    <Box sx={{ py: '10px' }}>
      <Typography variant="subtitle1">Service</Typography>
      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'khuyến mãi' },
          { value: 'isFreeShip', label: 'free ship' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
