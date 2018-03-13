import React, {Component} from 'react';
import classes from './Settings.css';
// import Aux from '../../../../hoc/AuxA';
import DatePicker from 'material-ui/DatePicker';
import Button from '../../../UI/Buttons/Button';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class Settings extends Component{
  state = {
    dropDownValue : 1,
    radioButtonValue: 1,
  }
  handleChange = (event, index, dropDownValue) => this.setState({dropDownValue});

  render(){
    return(
      <div>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          <RadioButton
            value={1}
            label="< 1 km"
            className={classes.radioButton}
          />
          <RadioButton
            value={2}
            label="< 5 km"
            className={classes.radioButton}
          />
          <RadioButton
            value={3}
            label="5km +"
            className={classes.radioButton}
          />
        </RadioButtonGroup>
        <DropDownMenu value={this.state.dropDownValue} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Eg. Eat, Exercise etc." />
          <MenuItem value={2} primaryText="Eat" />
          <MenuItem value={3} primaryText="Exercise" />
          <MenuItem value={4} primaryText="Swim" />
          <MenuItem value={5} primaryText="Entertainment" />
        </DropDownMenu>
        
        <DatePicker hintText="Choose a Date" />
        <Button> Find </Button>
      </div> 
    );
    // return(
    //   <Aux>
    //   </Aux>
    // );
  }
};

export default Settings;
