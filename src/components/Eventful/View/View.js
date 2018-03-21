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
import Aux from '../../../hoc/AuxA';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMap from 'google-distance-matrix';
const KEYS_TO_FILTERS = ['TITLE', 'CATEGORY']


class View extends Component {
  state = {
    events:[],
    searchTerm : '',
    currentPage: 1,
    todosPerPage: 6,
    distance: 0,
    activity: '',
    date: 0,
    all: false,
    address:'',
    dest: '',
    distanceText:''


  };
  constructor (props){
    super(props)
    this.searchUpdated = this.searchUpdated.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);

  }
  handleFormSubmit = (event) => {
    const component = this
    const { address, dest } = this.state

    event.preventDefault()
    console.log('hello')
    GoogleMap.matrix(address, dest, function (err, distances) {
        distance.key('AIzaSyCFKLGuYz6ffYby7U-ODjFtV5TO4nDyevE');
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }

        if (distances.status == 'OK') {
            if(distances.rows[0].elements[0])  {
                var distance = distances.rows[0].elements[0].duration['text'];

                component.setState({
                    foundDistance: true,
                    distanceText: distance
                });
            }
        }
    });
}

  componentWillMount() {
    let data = this.props.location.pathname.split("/");
    // console.log(Date.parse(data[4]))
    if(data[2] =="all"){
      // console.log(data[2])
      this.setState({
        all: true
      })
    }
    this.setState({
      distance: data[2],
      activity: data[3],
      date: data[4]
    })
  }
  // handleClick(event) {
  //       this.setState({
  //         currentPage: Number(event.target.id)
  //       });
  // }

  componentDidMount () {
      // axios.get( '/events.json' )
        database.ref('/').once('value')
          .then( response => {
            // let rawEvents = response.data;
            let rawEvents = response.val();

            let filteredEvents = [];
            console.log(this.state.all);
            if(!this.state.all){
              for( let eventA of rawEvents){
                // console.log(Date.parse(eventA.START_DATE))
                let date = Date.parse(eventA.START_DATE);
                if(eventA.CATEGORY == this.state.activity && (date >= this.state.date)){
                  filteredEvents.push(eventA);
                }
              }
            } else {
              filteredEvents = rawEvents;
            }
            this.setState({events: filteredEvents});
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
        // console.log(res.CATEGORY.toString())

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
