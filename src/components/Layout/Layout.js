import React from 'react';
import classes from './Layout.css';
import Find from '../Eventful/Find/Find';
import Settings from '../Eventful/Find/Configure/Settings';

const layout = (props) =>{

  return(
    <div>
      <Find> </Find>
      <Settings> </Settings>

    </div>

  );

}

export default layout;
