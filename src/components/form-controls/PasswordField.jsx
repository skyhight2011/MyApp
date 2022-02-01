import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function PasswordField(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = !!errors[name];
  const error = errors;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <FormControl error={hasError} fullWidth variant="outlined">
      <InputLabel htmlFor={name}> {label} </InputLabel>
      <Controller
        name={name}
        id={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <OutlinedInput
            label={label}
            form={form}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <FormHelperText>{error[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
