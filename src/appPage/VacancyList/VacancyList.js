import { React, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Button,
  Box
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { DeleteConfirmationDialog } from 'component';
import {
  authApolloClient,
  MUTATIONS,
  QUERIES
} from 'utils/apollo';
import { VacancyListItem } from 'component';

const VacancyList = () => {
  // DeleteConfirmationDialog is open
  let [confirmDialogOpen, setConfirmDialogOpen] = useState();
  // Current Vacancy this component is working with
  let [currentVacancy, setCurrentVacancy] = useState({});
  let { loading, error, data, refetch } = useQuery(QUERIES.VACANCY_LIST, { fetchPolicy: "no-cache"});
  if (loading) return 'Loading';
  if (error) return 'Error';

  function onVacancyDelete(vacancyId) {
    console.log('VacancyList // onVacancyDelete // vacancyId', vacancyId);
    setCurrentVacancy(data.vacancyList.find(el => el.id === vacancyId));
    setConfirmDialogOpen(true);
  };

  function onVacandyDeleteDialogConfirmed(){
    authApolloClient.mutate({mutation: MUTATIONS.DELETE_VACANCY, variables: {vacancyId: currentVacancy.id}})
      .then(response => {
        setConfirmDialogOpen(false);
        refetch();
      });
  }

  function closeDeleteConfirmationDialog(){
    setConfirmDialogOpen(false);
  }
  
  return (
    <Box sx={{py: 4}}>
      <DeleteConfirmationDialog
        open={confirmDialogOpen}
        vacancyId={currentVacancy.id}
        onClose={closeDeleteConfirmationDialog}
        onConfirm={onVacandyDeleteDialogConfirmed}
      >Are you sure you want to delete the vacancy "{currentVacancy.position}" in "{currentVacancy.company}"
      </DeleteConfirmationDialog>
      <Link to='/vacancy/create'>
          <Button color='primary.main' variant='contained'>New vacancy</Button>
      </Link>  
      {data.vacancyList.map((vacancy, idx) => 
        <div key={idx}>
          <VacancyListItem onDelete={onVacancyDelete} vacancy={vacancy}/>
        </div>)
      }
    </Box>
  )
};

export default VacancyList;