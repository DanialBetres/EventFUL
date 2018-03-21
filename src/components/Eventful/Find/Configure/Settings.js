import React, {Component} from 'react';
import classes from './Settings.css';
// import Aux from '../../../../hoc/AuxA';
import DatePicker from 'material-ui/DatePicker';
import Button from '../../../UI/Buttons/Button';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Aux from '../../../../hoc/AuxA';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class Settings extends Component{
  state = {
    dropValue : "dummy",
    date:"",
    distance: 0
  }

  DateValueHandler = (event) =>{

    console.dir(event);
    console.dir(event.getDate());
    console.dir(event.getMonth()+1);
    console.dir(event.getFullYear());
    this.setState({date:
      event.getDate() +"-" +
      (event.getMonth()+1) + "-" +
      event.getFullYear()})
    // console.log(x);
  }
  distanceHandler = (event) =>{
    // let distance =
    this.setState({distance: event.target.value})
    console.log(event.target.value);
  }



  handleChange = (event, index, value) => {
    // console.log( value);
    this.setState({dropValue: value});
    // console.log(this.state.value);
  };
  testButton = () => {

    console.log(this.state.dropValue);
    // console.log(this.state.value);
  };

  render(){
    return(
      <div>
      <Aux>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          <RadioButton
            onClick={this.distanceHandler}
            value={1}
            label="< 1 km"
            className={classes.radioButton}
          />
          <RadioButton
            onClick={this.distanceHandler}
            value={2}
            label="< 5 km"
            className={classes.radioButton}
          />
          <RadioButton
            onClick={this.distanceHandler}
            value={3}
            label="5km +"
            className={classes.radioButton}
          />
        </RadioButtonGroup>
        <DropDownMenu value={this.state.dropValue} onChange={this.handleChange}>
          <MenuItem  value={"dummy"} primaryText="Eg. Eat, Exercise etc." />
          <MenuItem  value={"Arts and Cultural Events"} primaryText="Arts and Cultural Events" />
          <MenuItem  value={"Community Events"} primaryText="Community Events" />
          <MenuItem  value={"Committee of the whole meetings"} primaryText="Committee of the whole meetings" />
          <MenuItem  value={"Special council meetings"} primaryText="Special council meetings" />
          <MenuItem  value={"Uptown Events"} primaryText="Uptown Events" />
          <MenuItem  value={"City Events"} primaryText="City Events" />
          <MenuItem  value={"Business Events"} primaryText="Business Events" />
          <MenuItem  value={"Environmental Events"} primaryText="Environmental Events" />
        </DropDownMenu>

        <DatePicker
            hintText="Choose a Date"
            onChange={(x, event) => this.DateValueHandler(event)}
            defaultDate={new Date()}

             />
        <Button
          clicked={"/View/"+
            this.state.distance +"/"+
            this.state.dropValue + "/" +
            this.state.date}
        > Find </Button>
      </Aux>
      </div>
    );
    // return(
    //   <Aux>
    //   </Aux>
    // );
  }
};

export default Settings;
