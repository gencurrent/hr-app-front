/**
 * The Landing Page for unauthenticated users
 */
import {ReactComponent as LPIcon} from "public/LP-icon.svg";
import { React, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
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
import { Box } from "@mui/system";


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
  const speedometervalues = [
    '❤️‍🩹 We are sorry to have nothing selected above',
    '👩‍🔬 At least we could try it',
    '👩‍💻 We are close to your expectations',
    '🎉 We meet the most of your demands',
    '🚀 HR-Eco is exactly what could help you'
  ];
  const [ checkedQuestions, setCheckedQuestions ] = useState([false, false, false, false]);
  const [ speedometerValue, setSpeedometerValue ] = useState(0);
  const [ speedometerText, setSpeedometerText ] = useState(speedometervalues[0]);
  const classes = useStyles();

  function udpateCheckboxValue(number, value) {
    const newValues = [...checkedQuestions];
    newValues[number] = value;
    setCheckedQuestions(newValues);
    let counter = 0;
    newValues.forEach(el => el ? counter++ : 0);
    setSpeedometerValue(counter / 4 * 100);
    setSpeedometerText(speedometervalues[counter]);
  }

  const windowWidth = window.innerWidth;

  return (
    <>
    <div className='anonymous-lp-mainbar'>
      <Box padding={1}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Typography component='h1' variant='h2' style={{fontWeight: 400}}>HR-Eco</Typography>
          </Grid>
          <Grid item>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
              <Link to={`/auth/signin`}>
                <Button size='large' variant='contained' color='primary'>Authenticate</Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
    <Container className={`lp-background ${classes.container}`} maxWidth={false}>
      
      <ThemeProvider theme={darkTheme}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Typography component='h1' variant='h2' align='center' style={{fontWeight: 400}}>Make recruiting a<br/>simple game</Typography>
            <LPIcon className='lp-image' />
          </Grid>
          <Grid item sm={12} md={6}>
            <RequestDemoForm/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>

    <Container className={`lp-benefits-block ${classes.container}`} maxWidth={false}>
      <ThemeProvider theme={lightTheme}>
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
                            label='Get feedback faster'
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
                            label='Score and filter all the responses'
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
              minValue={0}
              maxValue={100}
              value={speedometerValue}
              maxSegmentLabels={0}
              segments={1000}
              needleHeightRatio={0.8}
              currentValueText={speedometerText}
              valueTextFontSize='22px'
            />
            </Container>
          </Grid>
          
        </Grid>
      </ThemeProvider>
    </Container>

    <Container className={`${classes.container}`} maxWidth={false}>
      <ThemeProvider theme={darkTheme}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Typography component='h1' variant='h2' align='center' style={{fontWeight: 400}}>The essence</Typography>

            <Grid container justifyContent='center'><Grid item sm={12} md={8}>
                <Grid container justifyContent='flex-start' spacing={2}>
                  <Grid item sm={12}>
                    <Typography variant='h4' component='h3'>1. Create a vacancy</Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant='h4' component='h3'>2. Let your candidates fill the vacancy form</Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant='h4' component='h3'>3. Check: Score and filter responses</Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant='h4' component='h3'>4. Choose among the best candidates</Typography>
                  </Grid>
                </Grid>
            </Grid></Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>

    <DownBar />
    </>
  )
};

export default AnonymousLandingPage;