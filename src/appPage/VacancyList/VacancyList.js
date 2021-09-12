import { React } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { QUERIES } from 'utils/apollo';

const VacancyList = () => {
    let { loading, error, data } = useQuery(QUERIES.VACANCY_LIST);
    
    if (loading) return 'Loading';
    if (error) return 'Error';
    
    return (
        
        <>
        <Link to='/vacancy/create'>
            <Button >New vacancy</Button>
        </Link>

            {data.vacancyList.map((el, idx) => 
                <div key={idx}>
                    {JSON.stringify(el)}
                    
                </div>)
            }
        </>
    )
};

export default VacancyList;