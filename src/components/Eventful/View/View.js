import React, {Component} from 'react';
import classes from './View.css';
import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import Subheader from 'material-ui/Subheader';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import axios from 'axios';
import SearchBar from 'material-ui-search-bar';
import {createFilter} from 'react-search-input'
// import SearchInput, {createFilter} from 'react-search-input'
import database from '../../../assets/database';


const KEYS_TO_FILTERS = ['TITLE', 'CATEGORY']


class View extends Component {
  state = {
    events:[],
    searchTerm : '',
    currentPage: 1,
    todosPerPage: 6

  };
  constructor (props){
    super(props)
    this.searchUpdated = this.searchUpdated.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // database.ref(0).once('value', res =>{
    //   console.dir(res)
    //   console.log('hello')
    //   console.log(res.val());
    // })
    database.ref('/'+ 1).once('value').then(res =>{
      console.dir(res)
      console.log('hello')
      console.log(res.val());
    }) 
      
  }
  // handleClick(event) {
  //       this.setState({
  //         currentPage: Number(event.target.id)
  //       });
  // }

  componentDidMount () {
      // console.log( this.props );
      


      axios.get( '/events.json' )
          .then( response => {
            let rawEvents = response.data;
            this.setState({events: rawEvents});
            // console.log( response.data[0] );
          } )
          .catch( error => {
              console.log( error );
          } );
  }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render() {
    // const { events, currentPage, todosPerPage } = this.state;
    // // Logic for displaying current todos
    // const indexOfLastTodo = currentPage * todosPerPage;
    // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = events.slice(indexOfFirstTodo, indexOfLastTodo);
    // const renderTodos = currentTodos.map((events, index) => {
    //   return <li key={index}>{events}</li>;
    // });

    // Logic for displaying page numbers
    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(events.length / todosPerPage); i++) {
    //   pageNumbers.push(i);
    // }
    // const renderPageNumbers = pageNumbers.map(number => {
    //   return (
    //     <li
    //       key={number}
    //       id={number}
    //       onClick={this.handleClick}
    //     >
    //       {number}
    //     </li>
    //   );
    // });
    const filteredEvents = this.state.events.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    let searchResults = filteredEvents.map((res,i) => {
          return (
            <GridTile
              key={res.ID  + i}
              title={res.TITLE}
              subtitle={<span>Category: <b>{res.CATEGORY}</b></span>}>
              <img alt='img' src={res.VIDEO} />
            </GridTile>
          )
    });

    return (
      <div>
        <SearchBar
         onChange={this.searchUpdated}
         onRequestSearch={() => console.log('onRequestSearch')}
         style={{
           margin: '0 auto',
           maxWidth: 800
         }}
        />
        <div className={classes.root}>
        <GridList
          cellHeight={180}
          className={classes.gridList}>
          {searchResults}
        </GridList>
        </div>

      </div>
    )
  }
}

export default View;
