import React from 'react';
import TextField from 'material-ui/TextField';
import classes from '../../Eventful/login/login';

const TextFieldExample = (props) => {
  
    return(

        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" 
            rel="stylesheet"/>
                    
            <i className="material-icons" >{props.icon}</i>

            <TextField hintStyle={props.hintstyle} labelStyle={props.inputstyle} hintText={props.title}/>
        </div>
    )
}

export default TextFieldExample;