import React, {Component} from 'react';
import classes from './Settings.css';
import Aux from '../../../../hoc/AuxA';
import DatePicker from 'material-ui/DatePicker';




class Settings extends Component{
  state = {

  }

  render(){
    return(
      <div>
        <DatePicker hintText="Choose a Date" />
      </div> 
    );
    // return(
    //   <Aux>
    //   </Aux>
    // );
  }
};

export default Settings;
