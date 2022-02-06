import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { OutlinedInput, Box, FormControl, FormHelperText, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityField(props) {
  const { form, name, label, disabled } = props;

  const {
    formState: { errors },
    setValue,
  } = form;
  const hasError = !!errors[name];

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              maxWidth: '200px',
              justifyItems: 'center',
            }}
          >
            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput
              id={name}
              type="number"
              disabled={disabled}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              sx={{ display: 'inline-flex', justifyItems: 'center' }}
            />
            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />

      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
