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
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal';
import geolib from 'geolib';
import {geolocated} from 'react-geolocated';
import Geocode from "react-geocode";





const KEYS_TO_FILTERS = ['TITLE', 'CATEGORY']

const IMAGE_SOURCE = {
  "Arts and Cultural Events": "https://upload.wikimedia.org/wikipedia/commons/b/b8/P_culture_violet.png",
  "Community Events":"https://cdn.vectorstock.com/i/thumb-large/75/75/human-community-round-symbol-vector-14287575.jpg",
  "Committee of the whole meetings":"http://www.usgrh.info/wp-content/uploads/2016/08/Operations.png",
  "Special council meetings":"https://orig00.deviantart.net/e978/f/2017/197/3/8/symbol_of_the_galactic_council_by_rvbomally-dbgjvrs.png",
  "Council meetings":"https://orig00.deviantart.net/e978/f/2017/197/3/8/symbol_of_the_galactic_council_by_rvbomally-dbgjvrs.png",
  "Uptown Events":"http://dna.ncfchurch.org.za/wp-content/uploads/2012/01/UptownLogo2011.jpg",
  "City Events":"https://image.freepik.com/free-icon/set-of-buildings-in-a-city_318-41262.jpg",
  "Business Events":"https://image.freepik.com/free-icon/business-person-silhouette-wearing-tie_318-49988.jpg",
  "Environmental Events":"http://www.technologystudent.com/prddes1/renault2a.png",
  "Finance and strategic planning committee meetings": "https://image.freepik.com/free-icon/business-person-silhouette-wearing-tie_318-49988.jpg",
  "Exhibit":"https://www.shareicon.net/data/512x512/2015/10/18/657835_arts_512x512.png",
}

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
    distanceText:'',
    openModal: false,
    foundDistance: false,
    distanceText: "",
    address: "New York NY",
    dest: "Montreal"


  };
  constructor (props){
    super(props)
    this.searchUpdated = this.searchUpdated.bind(this);
    this.distanceBool = this.distanceBool.bind(this);
    // this.handleClick = this.handleClick.bind(this);

  }
  openModal =() =>{
    this.setState({openModal: true});
  }
  closeModal = () =>{
    this.setState({openModal: false});
  }

  getPosition = (position) =>{

  }

  distanceBool = (event) => {
    let dist = "";
    let locationLat = 0;
    let locationLng = 0;
    Geocode.fromAddress("Waterloo On").then(
      response =>{
        locationLat = response.results[0].geometry.location.lat;
        locationLng = response.results[0].geometry.location.lng;
        // console.dir(response.results[0].geometry.location) ;
        // console.log(lat,lng);
      },
      error =>{
        console.error(error);
      }
    )

    let tryA = navigator.geolocation.getCurrentPosition(
      function(position) {
        dist=  geolib.getDistance({latitude: position.coords.latitude, longitude:position.coords.longitude }, {
            latitude: locationLat,
            longitude: locationLng
        });
        // alert(  geolib.getDistance({latitude: position.coords.latitude, longitude:position.coords.longitude }, {
        // // alert('You are ' + geolib.getDistance(position.coords, {
        //     latitude: locationLat,
        //     longitude: locationLng
        // }));
    },
    function() {
        alert('Position could not be determined.')
    },
    {
        enableHighAccuracy: true
    });
    console.log(dist);
    console.dir(tryA)
    // navigator.geolocation.getCurrentPosition(
    //   function(position) {
    //       alert('You are ' + geolib.getDistance(position.coords, {
    //           latitude: 51.525,
    //           longitude: 7.4575
    //       }) + ' meters away from 51.525, 7.4575');
    //   },
    //   function() {
    //       alert('Position could not be determined.')
    //   },
    //   {
    //       enableHighAccuracy: true
    //   }
    // );


    const component = this
    // const { address, dest } = this.state
    let address = ["Toronto, ON, CA"];
    let dest = ["Vancouver, ON, CA"];
    let origins = ['San Francisco CA', '40.7421,-73.9914'];
    let destinations = ['New York NY', 'Montreal', '41.8337329,-87.7321554', 'Honolulu'];

    event.preventDefault()
    // console.log(event)
    let service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
    origins: ["Waterloo ON"],
    destinations: ["Toronto ON"],
    travelMode: 'DRIVING',
    avoidHighways: false,
    avoidTolls: false
  }, this.callback);
    console.dir(service);
    // GoogleMap.matrix(address, dest, function (err, distances) {
    //     GoogleMap.key("AIzaSyBXvfbFh1UkUhlVI7vfycrxxCOUIDgWW0A");
    //     GoogleMap.units('imperial');
    //     console.log("address");
    //     console.log(dest);
    //     // console.log(err);
    //     // console.log(distances);
    //     if (err) {
    //         return console.log(err);
    //     }
    //     if(!distances) {
    //         return console.log('no distances');
    //     }
    //
    //     if (distances.status == 'OK') {
    //         if(distances.rows[0].elements[0])  {
    //             var distance = distances.rows[0].elements[0].duration['text'];
    //             console.log(distance);
    //             component.setState({
    //                 foundDistance: true,
    //                 distanceText: distance
    //             });
    //         }
    //     }
    // });
}
 callback = (response, status) =>{
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
        console.dir(distance)
      }
    }

  }
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
    const {openModal} = this.state;

    let searchResults = filteredEvents.map((res,i) => {
        // console.log(res.CATEGORY.toString())
        // <button onClick={this.openModal}>Open modal</button>
        // <Modal open={openModal} onClose={this.closeModal} little>
        //   <p>
        //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        //     pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
        //     hendrerit risus, sed porttitor quam.
        //   </p>
        // </Modal>
          return (
              <GridTile
                key={res.ID  + i}
                title={res.TITLE}
                subtitle={<span>Category: <b>{res.CATEGORY}</b></span>}>

                <img alt='img' src={IMAGE_SOURCE[res.CATEGORY]} />
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
           maxWidth: 500
         }}
        />
        <button onClick={this.distanceBool}>Hello </button>
        <br/>
        <br/>
        <div className={classes.root}>
        <GridList
          cellHeight={200}
          className={classes.gridList}>
          {searchResults}
        </GridList>
        </div>





      </div>
    )
  }
}

export default View;
