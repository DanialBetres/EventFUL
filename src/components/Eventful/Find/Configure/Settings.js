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
    dropValue : "Everything",
    startDate:Date.now(),
    endDate: (Date.now() + 7 * 24 * 60 * 60 * 1000),
    distance: 10
  }

  StartDateValueHandler = (event) =>{

    // console.log(Date.parse(event))
    this.setState({
      startDate: Date.parse(event)
    })
  }
  EndDateValueHandler = (event) =>{

    // console.log(Date.parse(event))
    this.setState({
      endDate: Date.parse(event)
    })
  }
  distanceHandler = (event) =>{
    // let distance =
    this.setState({distance: event.target.value})
    // console.log(event.target.value);
  }



  handleChange = (event, index, value) => {
    // console.log( value);
    this.setState({dropValue: value});
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
            value={4.9}
            label="< 5 km"
            className={classes.radioButton}
          />
          <RadioButton
            onClick={this.distanceHandler}
            value={5}
            label="5km +"
            className={classes.radioButton}
          />
          <RadioButton
            onClick={this.distanceHandler}
            value={10}
            label="Everywhere"
            className={classes.radioButton}
          />
        </RadioButtonGroup>
        <DropDownMenu value={this.state.dropValue} onChange={this.handleChange}>
          <MenuItem  value={"Everything"} primaryText="Everything" />
          <MenuItem  value={"Arts and Cultural Events"} primaryText="Arts and Cultural Events" />
          <MenuItem  value={"Community Events"} primaryText="Community Events" />
          <MenuItem  value={"Committee of the whole meetings"} primaryText="Committee of the whole meetings" />
          <MenuItem  value={"Special council meetings"} primaryText="Special council meetings" />
          <MenuItem  value={"Uptown Events"} primaryText="Uptown Events" />
          <MenuItem  value={"City Events"} primaryText="City Events" />
          <MenuItem  value={"Business Events"} primaryText="Business Events" />
          <MenuItem  value={"Environmental Events"} primaryText="Environmental Events" />
          <MenuItem  value={"Exhibit"} primaryText="Exhibit" />
        </DropDownMenu>

        <DatePicker
            hintText="Choose Start Date"
            onChange={(x, event) => this.StartDateValueHandler(event)}
            defaultDate={new Date()}
             />
        <DatePicker
            hintText="Choose End Date"
            onChange={(x, event) => this.EndDateValueHandler(event)}
            defaultDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
             />
        <Button
          clicked={"/View/"+
            this.state.distance +"/"+
            this.state.dropValue + "/" +
            this.state.startDate + "/"+
            this.state.endDate }
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
