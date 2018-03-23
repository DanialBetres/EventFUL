import React from 'react';
import classes from './Find.css';
import Button from '../../UI/Buttons/Button';
// import settingStyles from '../../UI/Buttons/Button.css';

const find = (props) =>{


  return (
    <div>
      <Button clicked="/Settings"> Find an Event </Button>
      <Button clicked="/View/all"> View All </Button>
      <Button clicked="/Favourite"> Favourite </Button>


    </div>
  )
}

export default find;
