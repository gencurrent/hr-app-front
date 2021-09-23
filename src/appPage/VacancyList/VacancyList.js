import { React } from 'react';
import { useQuery } from '@apollo/client';
import {
  Button,
  Container,
  Box
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { QUERIES } from 'utils/apollo';
import { VacancyListItem } from 'component';

const VacancyList = () => {
    let { loading, error, data } = useQuery(QUERIES.VACANCY_LIST, { fetchPolicy: "no-cache"});
    
    if (loading) return 'Loading';
    if (error) return 'Error';
    
    return (
        
        <Box sx={{py: 4}}>
            <Link to='/vacancy/create'>
                <Button color='primary.main' variant='contained'>New vacancy</Button>
            </Link>

                {data.vacancyList.map((vacancy, idx) => 
                    <div key={idx}>
                        <VacancyListItem vacancy={vacancy}/>
                        
                    </div>)
                }

        </Box>
    )
};

export default VacancyList;