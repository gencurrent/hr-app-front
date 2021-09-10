import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const VacancyList = () => {
    const VACANCY_LIST = gql`
    query vacancyList{
       vacancyList{
           id
           company
           position
           text
       } 
    }
    `;
    const { loading, error, data } = useQuery(VACANCY_LIST);
    
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