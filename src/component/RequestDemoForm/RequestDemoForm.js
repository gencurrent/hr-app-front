/**
 * The form to request a service trial on the Anonymous Laning Page compoment
 */

import {React, useState} from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

import { pureApolloClient, MUTATIONS } from 'utils/apollo';

export default function RequestDemoForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState({'name': '', 'email': '', 'phone': ''});
  const [requestSent, setRequestSent] = useState(false);

  function updateData(key, e) {
    let {value} = e.target;
    let newData = {...data};
    newData[key] = value;
    setData(newData);
  };

  function onDemoRequestClick(e) {
    e.preventDefault();
    pureApolloClient.mutate({
      mutation: MUTATIONS.CREATE_DEMO_REQUEST,
      variables: data
    }).then(result => {
      console.log(result);
      setRequestSent(true);
    })
    .catch(error => {
      setRequestSent(false);
    })
    .then(() => {
      setDialogOpen(true);
    })
    
  }

  return (
    <>
    <Container maxWidth='sm'>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h5' component='h3'>Get your demo access</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => updateData('name', e)}
                variant='outlined'
                fullWidth
                id='name'
                autoComplete='name'
                label='Full Name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => updateData('email', e)}
                variant='outlined'
                fullWidth
                id='email'
                label='Email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => updateData('phone', e)}
                variant='outlined'
                id='phone'
                autoComplete='phone'
                fullWidth
                label='Phone number'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>We will contact you in order to try the service</Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={onDemoRequestClick}
                type='submit'
                variant='contained'
                color='primary'
              >Request demo
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
    >
      <DialogTitle>
        {requestSent ? '🎉 Cheers!' : '❌ Unexpected error'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {requestSent ? 'Thank you for the request!' : 'Please, try again later'}
          <br/>
          {requestSent ? 
            'We have received your request and will contact you as soon as possible.'
            :
            'An unexpected error is occured. We already work to resolve the inconvenience.'
          }
          
        </DialogContentText>
        <Button onClick={e => setDialogOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
    </>
  )
};