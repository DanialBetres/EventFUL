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
    width: 297,
    height: 133,
  }

  return (
    <div>
      <Header> </Header>
        <Flexbox className={classes.flex} flexDirection="column" align="center" >
          <Button sty={style} clicked="/Settings"> Find an Event </Button>
          <br/>
          <Button sty={style} style clicked="/View/all"> View All </Button>
          <br/>
          <Button sty={style} style clicked="/Favourite"> Favourite </Button>
        </Flexbox>
      <Footer > </Footer>
    </div>
  )
}

export default find;
