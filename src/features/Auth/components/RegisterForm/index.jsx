import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, CssBaseline, LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import { yupResolver } from '@hookform/resolvers/yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const theme = createTheme();

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Please enter your full name.')
    .test('should has at least two words', 'Please enter at least two words.', (value) => {
      return value.split(' ').length >= 2;
    }),
  email: yup.string().required('Please enter your email.').email('Please enter a valid email address.'),
  password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 characters.'),
  retypePassword: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

function RegisterForm(props) {
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (data) => {
    console.log('data:', data);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(data);
    }
    e.target.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {isSubmitting && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            )}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box component="form" onSubmit={form.handleSubmit(handleSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField name="fullName" label="Full Name" form={form} autoFocus />
                </Grid>

                <Grid item xs={12}>
                  <InputField name="email" label="Email" form={form} />
                </Grid>

                <Grid item xs={12}>
                  <PasswordField name="password" fullWidth form={form} label="Password" />
                </Grid>

                <Grid item xs={12}>
                  <PasswordField name="retypePassword" fullWidth form={form} label="Retype Password" />
                </Grid>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, ml: 1.5 }}
                >
                  Create an account
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default RegisterForm;
