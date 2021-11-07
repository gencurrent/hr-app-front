import { React } from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';

export default function SubmissionSalutationPage() {
  return (
    <Box sx={{py: 4}}>
      <Typography component='h1' variant='h4' align='center'>You have applied successfully</Typography>
      <Typography align='center'>We have recieved your application and the company should review the answers soon</Typography>
    </Box>
  )
};