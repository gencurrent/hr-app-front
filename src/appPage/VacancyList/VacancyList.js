import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { QUERIES } from 'utils/apollo';

const VacancyList = () => {
    let { loading, error, data } = useQuery(QUERIES.VACANCY_LIST);
    // const { loading, error, data } = 
    useEffect(() => {
    });
    
    console.log({loading, error, data});
    
    if (loading) return 'Loading';
    if (error) return 'Error';
    console.log(data);
    console.log(typeof(data));
    
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