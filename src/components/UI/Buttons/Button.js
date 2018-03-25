import React from 'react';
import classes from './Button.js';
import RaisedButton from 'material-ui/RaisedButton';
import {Route} from 'react-router-dom';
import Aux from '../../../hoc/AuxA';
import findStyles from '../../Eventful/Find/Find.css';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const button = (props) =>{

  // testPurpose = () =>{
  //   console.log(props.data);
  // }
  return (
    <div>
    <Aux data={props.data}>
      <Route render={({ history}) => (
        <RaisedButton
          onClick={()=>{
            history.push(props.clicked);
            let data = props.data;
          }}
      
        // primary={true}
        style={props.sty}
        labelStyle={props.sty2}
        label={props.children}
        backgroundColor={props.colour}
        fullWidth={props.width}
      >  </RaisedButton>


      )} />
    </Aux>
    </div>
  );

}

export default button;
