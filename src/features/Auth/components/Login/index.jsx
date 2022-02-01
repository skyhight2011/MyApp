import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import { Snackbar } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import { useSnackbar } from 'notistack';

Login.propTypes = { closeDialog: PropTypes.func };

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      //show snackBar success
      enqueueSnackbar('login successfuly !!!', { variant: 'success' });

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
