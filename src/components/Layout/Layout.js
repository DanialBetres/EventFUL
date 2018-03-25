import React, {Component} from 'react';
import classes from './Layout.css';
import Find from '../Eventful/Find/Find';
import Settings from '../Eventful/Find/Configure/Settings';
import View from '../Eventful/View/View';
import Aux from '../../hoc/AuxA';
import { Route, NavLink, Switch, Link, Redirect} from 'react-router-dom';
import Login from '../Eventful/login/login';

class Layout extends Component{
  render(){
    return(
      <Aux>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Settings" component={Settings} />
            <Route path="/View" component={View} />
            <Route path="/Favourite" component={View} />
            <Route path="/Find" component={Find} />
            <Redirect from="*" to="/Find" />
          </Switch>

      </Aux>
    );

  }

  //
  //   <hr />
  //     <p> Find Page </p>
  //     <Find> </Find>
  //   <hr />
  //     <p> Setting Page </p>
  //     <Settings> </Settings>
  //   <hr />
  //     <p> View Page </p>
  //     <View> </View>


}

export default Layout;
