import React, {Component} from 'react';
import classes from './Header.css';
import RaisedButton from 'material-ui/RaisedButton';
import {Route} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const recentsIcon = <FontIcon className="material-icons"></FontIcon>;
const favoritesIcon = <FontIcon className="material-icons"></FontIcon>;
const nearbyIcon = <FontIcon className="material-icons"></FontIcon>;

class Header extends Component {
  state = {
    selectedIndex: 10,
    style: null,
  };
  constructor(props){
    super(props);
    this.setState({
      style: props.styl
    })
  }
  componentWillMount(){

  }

  select = (index) => this.setState({selectedIndex: index});
  // testPurpose = () =>{
  //   console.log(props.data);
  // }
  render(){
    return (
      <div >
        <Paper zDepth={5} >
          <BottomNavigation style={{height:25}} selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Home"
              icon={recentsIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Favourite"
              icon={favoritesIcon}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="Help"
              icon={nearbyIcon}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }


}

export default Header;
