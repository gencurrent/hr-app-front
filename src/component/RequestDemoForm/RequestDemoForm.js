/**
 * The form to request a service trial on the Anonymous Laning Page compoment
 */

import {React} from 'react';
import {
  Card,
  Container,
  Grid,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

export default function RequestDemoForm() {
  return (
    <Container maxWidth='sm'>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h5' component='h3'>Get your demo access</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='name'
                autoComplete='name'
                label='Full Name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='email'
                label='Email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                id='phone'
                autoComplete='phone'
                fullWidth
                label='Phone number'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component='p'>We will contact you in order to try the service</Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
              >Request demo
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  )
};