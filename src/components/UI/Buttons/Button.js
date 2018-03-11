import React from 'react';
import classes from './Button.js';

const button = (props) =>{

  return (
    <div>
      <button onClick={props.clicked}> {props.children} </button>
      
    </div>
  );
}

export default button;
