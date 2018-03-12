import React from 'react';
import classes from './Button.js';
import RaisedButton from 'material-ui/RaisedButton';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const button = (props) =>{

  return (
    <div>
      <RaisedButton onClick={props.clicked} label={props.children} primary={true} className={classes.style} >  </RaisedButton>
    </div>
  );

}

export default button;
