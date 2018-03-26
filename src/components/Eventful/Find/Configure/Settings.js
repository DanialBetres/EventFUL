import React, {Component} from 'react';
import classes from './Settings.css';
// import Aux from '../../../../hoc/AuxA';
import DatePicker from 'material-ui/DatePicker';
import Button from '../../../UI/Buttons/Button';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Footer from '../../../Layout/Footer/Footer';
import Header from '../../../Layout/Header/Header';
import Flexbox from 'flexbox-react';
import { red100 } from 'material-ui/styles/colors';
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
    const styles = {
      buttons: {
          width: 158,
          height:50,
          color:'#2F6F94',
      },
      signinbutton1text:{
        fontSize:18,
        color:'white'

    },
    }
    return(
      <div>

        <Header />
        <Flexbox className={classes.flex} flexDirection="column" align="center" >
        <div className={classes.test}>
          <h4 className={classes.text}> Willing to travel ... </h4>
          <RadioButtonGroup name="shipSpeed" defaultSelected={10}>

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
              label="Anywhere"
              className={classes.radioButton}
            />
          </RadioButtonGroup>
        </div>


          <h4 className={classes.text}> I want to do ... </h4>
        <SelectField value={this.state.dropValue} onChange={this.handleChange} autoWidth={true}>
          <MenuItem  value={"Everything"} primaryText="Anything" />
          <MenuItem  value={"Arts and Cultural Events"} primaryText="Arts and Cultural Events" />
          <MenuItem  value={"Community Events"} primaryText="Community Events" />
          <MenuItem  value={"Committee of the whole meetings"} primaryText="Committee of the whole meetings" />
          <MenuItem  value={"Special council meetings"} primaryText="Special council meetings" />
          <MenuItem  value={"Uptown Events"} primaryText="Uptown Events" />
          <MenuItem  value={"City Events"} primaryText="City Events" />
          <MenuItem  value={"Business Events"} primaryText="Business Events" />
          <MenuItem  value={"Environmental Events"} primaryText="Environmental Events" />
          <MenuItem  value={"Exhibit"} primaryText="Exhibit" />
        </SelectField>

        <h4 className={classes.text}> Start Date </h4>

        <DatePicker
            hintText="Choose Start Date"
            onChange={(x, event) => this.StartDateValueHandler(event)}
            defaultDate={new Date()}
             />
        <h4 className={classes.text}> End Date </h4>
        <DatePicker
            hintText="Choose End Date"
            onChange={(x, event) => this.EndDateValueHandler(event)}
            defaultDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
             />
        <div className={classes.button}>
        <Flexbox flexDirection="row">
          <Button
          colour={"#6ca0dc"}
          sty2={styles.signinbutton1text}
          sty={styles.buttons}
            clicked={"/Find"}
          > Cancel </Button>
          <div className={classes.space}> </div>
          <Button
          colour={"#6ca0dc"}
          sty2={styles.signinbutton1text}

          sty={styles.buttons}
            clicked={"/View/"+
              this.state.distance +"/"+
              this.state.dropValue + "/" +
              this.state.startDate + "/"+
              this.state.endDate }
          > Search </Button>


        </Flexbox>
  </div>
        <Footer/>
        </Flexbox>
      </div>
    );
    // return(
    //   <Aux>
    //   </Aux>
    // );
  }
};

export default Settings;
