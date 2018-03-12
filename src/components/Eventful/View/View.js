import React, {Component} from 'react';
import classes from './View.css';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import axios from 'axios';


class View extends Component {
  state = {
    events:[]
  };

  componentDidMount () {
      // console.log( this.props );
      axios.get( '/events.json' )
          .then( response => {
            let rawEvents = response.data;

            this.setState({events: rawEvents});

              console.log( response.data[0] );
          } )
          .catch( error => {
              console.log( error );
          } );
  }

  render() {
    const events2 = this.state.events.map((res, i) => (
      <GridTile
        key={res.ID  + i}
        title={res.TITLE}
        subtitle={<span>Category: <b>{res.CATEGORY}</b></span>}>
        <img src={res.VIDEO} />
      </GridTile>
    ));
    return (
      <div>
      <div className={classes.root}>
        <GridList
          cellHeight={180}
          className={classes.gridList}>
          <Subheader>View</Subheader>
          {events2}
        </GridList>

      </div>

      </div>
    )
  }
}

export default View;
