import React from 'react';
import { Link } from 'react-router-dom';


class LandingPage extends React.Component {
  render = () => {
    return (
      <>
        <Link to='/'>
          <p>Main page</p>
        </Link>
        <Link to='/vacancy'>
          <p>Vacancy List</p>
        </Link>
        <Link to='/stats'>
          <p>Stats</p>
        </Link>
      </>
    )
  }
};

export default LandingPage;
