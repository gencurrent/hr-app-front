import { React } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { QUERIES } from 'utils/apollo';
import { VacancyListItem } from 'component';

const VacancyList = () => {
    let { loading, error, data } = useQuery(QUERIES.VACANCY_LIST, { fetchPolicy: "no-cache"});
    
    if (loading) return 'Loading';
    if (error) return 'Error';
    
    return (
        
        <>
        <Link to='/vacancy/create'>
            <Button >New vacancy</Button>
        </Link>

            {data.vacancyList.map((vacancy, idx) => 
                <div key={idx}>
                    <VacancyListItem vacancy={vacancy}/>
                    
                </div>)
            }
        </>
    )
};

export default VacancyList;