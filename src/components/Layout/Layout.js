import React, {Component} from 'react';
import classes from './Layout.css';
import Find from '../Eventful/Find/Find';
import Settings from '../Eventful/Find/Configure/Settings';
import View from '../Eventful/View/View';
import Aux from '../../hoc/AuxA';



class Layout extends Component{
  render(){
    return(
      <Aux>
        <hr />
          <p> Find Page </p>
          <Find> </Find>
        <hr />
          <p> Setting Page </p>
          <Settings> </Settings>
        <hr />
          <p> View Page </p>
          <View> </View>
      </Aux>
    );
    
  }



}

export default Layout;
