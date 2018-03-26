import React from 'react';
import classes from './Find.css';
import Button from '../../UI/Buttons/Button';
// import settingStyles from '../../UI/Buttons/Button.css';
// import Aux from '../../../../hoc/AuxA';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import Flexbox from 'flexbox-react';


const find = (props) =>{
  const style={
    dimension: {
      width: 320,
      height: 160,
    },
    text:{
      fontSize:25,
      color:"white"
  },
  }

  return (
    <div>
      <Header> </Header>
        <Flexbox className={classes.flex} flexDirection="column" align="center" >
          <Button sty={style.dimension} sty2={style.text} colour={"#6ca0dc"} clicked="/Settings"> Find an Event </Button>
          <br/>
          <Button sty={style.dimension} sty2={style.text}  colour={"#6ca0dc"}  clicked="/View/all"> View All </Button>
          <br/>
          <Button sty={style.dimension} sty2={style.text}  colour={"#6ca0dc"} clicked="/Favourite"> Favourite </Button>
        </Flexbox>
      <Footer > </Footer>
    </div>
  )
}

export default find;
