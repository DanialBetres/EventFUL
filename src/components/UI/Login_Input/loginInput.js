import React from 'react';
import TextField from 'material-ui/TextField';
import classes from '../../Eventful/login/login';
import FontIcon from 'material-ui/FontIcon';

const styles = () => {
    icon : {
        
      fontSize:'50px'

    }
}
const TextFieldExample = (props) => {
  

    return(

        <div className={classes.txtfield}>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" 
            rel="stylesheet"/>
                <FontIcon color='#FFFFFF' style={{fontSize:'35px', marginTop:'20px'}} className="material-icons" >{props.icon}</FontIcon>
             {/* <i color='#8B8C8D' fontsSize={'48px'} className="material-icons" >{props.icon}</i> */}

            <TextField hintStyle={props.hintstyle} labelStyle={props.inputstyle} hintText={props.title}/>
        </div>
    )
}

export default TextFieldExample;