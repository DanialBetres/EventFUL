import Button from '../../UI/Buttons/Button';
import React, {Component} from 'react';
import classes from './login.css';
// import TextFieldExample from '../../UI/Login_Input/loginInput';
import { blue50, grey300,grey50 } from 'material-ui/styles/colors';
import TextFieldExample from'../../UI/Login_Input/loginInput';
import database from '../../../assets/database';
import Flexbox from 'flexbox-react';
import Polygon from 'react-polygon'

class Login extends Component {
    
    populateLocation = () => {
        const locations = ["Costco Waterloo","Icon Waterloo","Laurier University","Phils Grandsons Place","Waterloo Tennis Club"];

        var j=true;
        var k=0;
        for(var i=0; i<=568; i++){
            database.ref(i + "/LOCATION").set(locations[k])
            if(k==0){
                j=true;
            } else if (k==4) {
                j=false;
            }
            if(j==true){
                k++
            } else {
                k--
            }
      
        }
        
        console.log("hello");
      }
    
    render(){

        const styles = {
            loginAlternative: {
                width: 158,
                height:36,
            },
            signInButton: {
                width:225,
                height:45,
                fontSize:24,
                color:'#FFFFFF',
            //    color:rgba(255, 255, 255, 0.6)
            },
            signInButton2: {
                width:180,
                height:42,
                fontSize:18,
                color:'#FFFFFF',
            //    color:rgba(255, 255, 255, 0.6)
            },
            hintstyle: {
                color:'#FFFFFF',
                justifyContent:'baseline',
                fontSize:28
                
            },
            signinbutton1text:{
                fontSize:24,
                color:"black",

            },
            signinbutton2text:{
                fontSize:18,
                color:"black"
            },
            background: {
                backgroundImage: "url('../../../assets/kitchener.png')"
            }
     
        }

    return (
        
        <div className={classes.parent} styles={{ backgroundImage: "url('../../../assets/kitchener.png')"}}>
                <Flexbox className={classes.flex}>
                {/* <div className={classes.poly}>
                <Polygon fillColor={"#FFF275"} size={75} ratios={[1,1,1,1,1,1]} n={6} />
                <Polygon fillColor={"#FFFFFF"} size={75} ratios={[1,1,1,1,1,1]} n={6} />
    </div> */}
            <div className={classes.title}>
        

                <h1 className={classes.title2}>EVENT</h1> <h1 className={classes.title1}> FUL </h1>
             
                
            </div>
            <div className={classes.signin}>
                <TextFieldExample hintstyle = {styles.hintstyle} className={ classes.text + " " + classes.signinText} title="Username" icon="person"/>
                <TextFieldExample hintstyle = {styles.hintstyle} className={ classes.text + " " + classes.signinText} title="Password" icon="lock"/>

                    <Button sty={styles.signInButton} colour={"#BEDAF7"} clicked="/Find" fullwidth={true} sty2={styles.signinbutton1text} width={true} className={classes.login + " " + classes.signinText} primary={false}>SIGN IN</Button>

                <div className={classes.alternativeLogin}>
                    <h4 className={classes.newuser  + " " + classes.text}>Create Account</h4>
                    <h4 className={classes.newuser  + " " + classes.text}>Forgot Password?</h4>
                </div>
            </div>
            <div className={classes.bottom} >
            {/* <Flexbox flexDirection="row"  justifyContent="flex-end"> */}
                <h6 className={classes.bottom1}> LOGIN WITH</h6>
            <div className={classes.alternativeLoginButtons}>
            {/* <Flexbox justifyContent="space-evenly"> */}
                <Button sty={styles.signInButton2} colour={"#BEDAF7"} sty2={styles.signinbutton2text} primary={false}>FACEBOOK</Button>
                <Button sty={styles.signInButton2} colour={"#BEDAF7"} sty2={styles.signinbutton2text} primary={false}>GOOGLE</Button>
                {/* </Flexbox> */}
            </div>
            </div>
            {/* </Flexbox> */}
            <div>
            {/* <svg className={classes.polygon}>
                 <polygon />
            </svg> */}
            {/* <Polygon size={100} ratios={[1,1,1,1,1,1]} n={6} /> */}
            {/* <Polygon size={50} ratios={[1,1,1,1,1,1]} n={6} fill={"#2F6F94"} strokeColor={"#F2F2F2"} /> */}

            </div>
            </Flexbox>
        </div>
    )
}
}; 




export default Login;