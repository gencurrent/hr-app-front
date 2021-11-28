/**
 * The Landing Page for unauthenticated users
 */
import {ReactComponent as LPIcon} from "public/LP-icon.svg";
import { React, useState } from 'react';
import {
  Container,
  Grid,
  Input,
  Typography,
  makeStyles,
  FormGroup,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
  Card
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactSpeedometer from 'react-d3-speedometer';

import {
  RequestDemoForm,
  DownBar
} from 'component';
import { lightTheme, darkTheme } from 'utils/material';
import { Box, minWidth } from "@mui/system";


const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  checkBoxFormGroup: {
    padding: theme.spacing(1),
    width: '100%',
    border: '1px solid #ff5722',
    borderRadius: '4px'
  }
}));

function AnonymousLandingPage() {
  const [ checkedQuestions, setCheckedQuestions ] = useState([false, false, false, false]);
  const [ speedometerValue, setSpeedometerValue ] = useState(0);
  const classes = useStyles();

  function udpateCheckboxValue(number, value) {
    const newValues = [...checkedQuestions];
    newValues[number] = value;
    setCheckedQuestions(newValues);
    let counter = 0;
    newValues.forEach(el => el ? counter++ : 0);
    setSpeedometerValue(counter / 4 * 100);
  }

  const windowWidth = window.innerWidth;

  return (
    <>
    <div className='anonymous-lp-mainbar'>
      <Typography component='h1' variant='h2' style={{fontWeight: 400}}>HR-Eco</Typography>
    </div>
    <Container className={`lp-background ${classes.container}`} maxWidth={false}>
      
      <ThemeProvider theme={lightTheme}>
        <Grid container>
          <Grid item sm={12} md={6} alignContent='center'>
            <Typography component='h1' variant='h2' align='center' style={{fontWeight: 400}}>Make recruiting a<br/>simple game</Typography>
            {/* <Grid container>
              <Grid item sm={12} md={6} alignContent='center' alignItems='center'> */}
                <LPIcon className='lp-image' />
              {/* </Grid>
            </Grid> */}
          </Grid>
          <Grid item sm={12} md={6}>
            <RequestDemoForm/>
          </Grid>
          
          <Link to={`/auth/signin`}>Authenticate</Link>
        </Grid>
      </ThemeProvider>
    </Container>

    <Container className={`lp-benefits-block ${classes.container}`} maxWidth={false}>
      <ThemeProvider theme={darkTheme}>
        <Grid container>
          {/* CheckBoxes */}
          <Grid item sm={12} md={6}>
            <Typography component='h1' variant='h2' align='center' style={{fontWeight: 400}}>The benefits</Typography>
              <Grid container justifyContent='center'>
                <Grid item sm={12} md={8}>
                  <Card>
                    <Box style={{padding: '24px'}}>

                      <Grid container justifyContent='center' spacing={2}>
                        <Grid item sm={12} style={{width: '100%'}}>
                          <Box className={`${classes.checkBoxFormGroup}`}>
                            <FormControlLabel
                              className='unselectable'
                              style={{width: '100%'}}
                              control={
                                <Checkbox
                                  checked={checkedQuestions[0]}
                                  onChange={(e) => udpateCheckboxValue(0, e.target.checked)}
                                  name='question-0'
                                />
                              }
                              label='Turn your responses into achievement'
                            />
                            </Box>
                        </Grid>

                        <Grid item sm={12} style={{width: '100%'}}>
                          <Box className={`${classes.checkBoxFormGroup}`}>
                            <FormControlLabel
                              className='unselectable'
                              style={{width: '100%'}}
                              control={
                                <Checkbox
                                  checked={checkedQuestions[1]}
                                  onChange={(e) => udpateCheckboxValue(1, e.target.checked)}
                                  name='question-1'
                                />
                              }
                              label='Get feedback quickly'
                            />
                          </Box>
                        </Grid>

                        <Grid item sm={12} style={{width: '100%'}}>
                          <Box className={`${classes.checkBoxFormGroup}`}>
                            <FormControlLabel
                              className='unselectable'
                              style={{width: '100%'}}
                              control={
                                <Checkbox
                                  checked={checkedQuestions[2]}
                                  onChange={(e) => udpateCheckboxValue(2, e.target.checked)}
                                  name='question-2'
                                />
                              }
                              label='Conquer and divide responses'
                            />
                          </Box>
                        </Grid>

                        <Grid item sm={12} style={{width: '100%'}}>
                          <Box className={`${classes.checkBoxFormGroup}`}>
                            <FormControlLabel
                              className='unselectable'
                              style={{width: '100%'}}
                              control={
                                <Checkbox
                                  checked={checkedQuestions[3]}
                                  onChange={(e) => udpateCheckboxValue(3, e.target.checked)}
                                  name='question-3'
                                />
                              }
                              label='Hire easy'
                            />
                          </Box>
                        </Grid>

                      </Grid>

                    </Box>
                  </Card>
                </Grid>
              </Grid>
          </Grid>
          <Grid item sm={12} md={6} alignContent='center'>
            <Container style={{padding: '12px'}}>
            <ReactSpeedometer
              // fluidWidth={true}
              height={300}
              width={windowWidth < 500 ? windowWidth * 0.8 : 500}
              segments={4}
              minValue={0}
              maxValue={100}
              value={speedometerValue}
              maxSegmentLabels={0}
              segments={1000}
              needleHeightRatio={0.8}
            />
            </Container>
          </Grid>
          
        </Grid>
      </ThemeProvider>
    </Container>
    <DownBar />
    </>
  )
};

export default AnonymousLandingPage;