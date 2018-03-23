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
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
// import { withScriptjs, withGoogleMap,  Marker } from "google-maps-react"




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
    startDate: 0,
    endDate: 0,
    all: false,
    openModal: false,
    dist: 0,
    distBool: false,
    favourite: false,

  };
  constructor (props){
    super(props)
    this.searchUpdated = this.searchUpdated.bind(this);
    this.distanceBool = this.distanceBool.bind(this);
    // this.handleClick = this.handleClick.bind(this);

  }
  componentWillMount() {
    let data = this.props.location.pathname.split("/");
    // console.log(Date.parse(data[4]))
    if(data[1] == "Favourite"){
      this.setState({
        favourite: true
      })
    }
    if(data[2] =="all"){
      // console.log(data[2])
      this.setState({
        all: true
      })
    }
    this.setState({
      distance: data[2],
      activity: data[3],
      startDate: data[4],
      endDate: data[5]
    })
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }
  }

  openModal =() =>{
    this.setState({openModal: true});
  }
  closeModal = () =>{
    this.setState({openModal: false});
  }
  distanceBool = (event) => {
    // console.dir(event);
    let destination = [event];
    let location = this;
    let distFinal = 0;
    let service = new window.google.maps.DistanceMatrixService();

    const currLocation = this.state.latitude + " " + this.state.longitude;
    return new Promise((resolve)=>{

        service.getDistanceMatrix({
        origins: [currLocation],
        destinations: destination,
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status){
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
             // _this.
             // console.log(distance);
             location.distFinal = distance;
             // return distance;
             location.setState({
               dist: distance
             })
           }
         }

       }
       resolve(location.distFinal);
     })
    }).then((res)=>{
      return res;
    })

}
  favouriteEvent = (event,i) => {
    database.ref('/569/' + i ).set(event);

    console.log(event);
    console.log(i);
  }


  // handleClick(event) {
  //       this.setState({
  //         currentPage: Number(event.target.id)
  //       });
  // }
// database.ref(i).once('value').then( response => {
//
//   database.ref('favourite/' + i).set(response.val());
// })
  filterFavourite = (rawEvents)=>{

  }

  componentDidMount () {


    if(this.state.favourite){
      database.ref('/569/').once('value')
        .then( response => {
          // let rawEvents = response.data;
          let rawEvents = response.val();

          console.dir(rawEvents);

          let filteredEvents = [];
          // console.log(rawEvents);
          for(let eventA in rawEvents){
            console.log();
            if(eventA != null){
              filteredEvents.push(rawEvents[eventA]);
            }
          }
          // for(let i=0; i <rawEvents.length;i++){
          //
          //   let eventA = rawEvents[i];
          //   if(eventA != null){
          //     console.log(eventA)
          //
          //     filteredEvents.push(eventA);
          //   }
          // }
          console.log(rawEvents);
          this.setState({events: filteredEvents});

        });

        this.setState({favourite:false})


    } else {


      // axios.get( '/events.json' )
        database.ref('/').once('value')
          .then( response => {
            // let rawEvents = response.data;
            let rawEvents = response.val();
            let filteredEvents = [];
            console.dir(rawEvents);

            if(!this.state.all){
              console.log(rawEvents);
              // =======================This is if distance is everything ============================
              if(this.state.distance ==10){

                for( let eventA of rawEvents){
                  if(eventA.ID != null){
                  let sdate = Date.parse(eventA.START_DATE);
                  let edate = Date.parse(eventA.END_DATE);
                  let startDateArr = eventA.START_DATE.split(" ");
                  let endDateArr = eventA.END_DATE.split(" ");
                  let startDate = startDateArr[1];
                  let endDate = endDateArr[1];
                  startDate = this.tConvert(startDate);
                  endDate = this.tConvert(endDate);
                  eventA.START_DATE = startDateArr[0] + " " + startDate;
                  eventA.END_DATE = endDateArr[0] + " " + endDate;

                  if (this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate)){
                    filteredEvents.push(eventA);
                  }
                  else if(eventA.CATEGORY === this.state.activity && (sdate >= this.state.startDate && edate <=this.state.endDate)){
                    filteredEvents.push(eventA);
                  }
                }
                }


              } else {
                console.log(this.state.distance)
                console.log(rawEvents);
                // ===========================================This is if distance is required========
                for( let eventA of rawEvents){

                  if(eventA.ID != null){
                  // console.log(Date.parse(eventA.START_DATE))
                  let sdate = Date.parse(eventA.START_DATE);
                  let edate = Date.parse(eventA.END_DATE);
                  let startDateArr = eventA.START_DATE.split(" ");
                  let endDateArr = eventA.END_DATE.split(" ");
                  let startDate = startDateArr[1];
                  let endDate = endDateArr[1];
                  startDate = this.tConvert(startDate);
                  endDate = this.tConvert(endDate);
                  eventA.START_DATE = startDateArr[0] + " " + startDate;
                  eventA.END_DATE = endDateArr[0] + " " + endDate;

                  if(eventA.LOCATION){
                    new Promise((resolve)=>{
                      let x = this.distanceBool(eventA.LOCATION)

                      resolve(x)
                    }).then((res)=>{
                      let dist = parseFloat(res);
                      console.log(dist)
                      if(this.state.distance ==5 && dist > this.state.distance){
                        this.setState({distBool: true})
                      } else if (this.state.distance ==4.9 && dist<5 && dist>1){
                        this.setState({distBool: true})
                      } else if (this.state.distance ==1 && dist<1){
                        this.setState({distBool: true})
                      }
                      eventA.DISTANCE = res;
                      // console.log(this.state.distance);
                      // console.log(this.state.distBool);
                      if (this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate) && this.state.distBool ){
                        filteredEvents.push(eventA);
                      } else if(eventA.CATEGORY === this.state.activity && (sdate >= this.state.startDate && edate <=this.state.endDate) &&this.state.distBool){
                        filteredEvents.push(eventA);
                      }
                    }).then(()=>{
                      this.setState({distBool: false});
                    })

                  }
                }
                }
              }

            } else {
              console.log(rawEvents);
              for( let eventA of rawEvents){
                if(eventA.ID != null){
                  // console.log(eventA);
                  // console.log(Date.parse(eventA.START_DATE))
                  let date = Date.parse(eventA.START_DATE);
                  let tmpEndDate = Date.parse(eventA.END_DATE);
                  // console.log(eventA)
                  let startDateArr = eventA.START_DATE.split(" ");
                  let endDateArr = eventA.END_DATE.split(" ");
                  let startDate = startDateArr[1];
                  let endDate = endDateArr[1];
                  startDate = this.tConvert(startDate);
                  endDate = this.tConvert(endDate);
                  eventA.START_DATE = startDateArr[0] + " " + startDate;
                  eventA.END_DATE = endDateArr[0] + " " + endDate;
                  if(tmpEndDate >= Date.now()){
                    filteredEvents.push(eventA);
                  }
                }


              }
            }
            this.setState({events: filteredEvents});
          } )
          .catch( error => {
              console.log( error );
          } );
      }//This is for the beginning if statement
  }
//   componentDidMount () {
//
//
//     if(this.state.favourite){
//       database.ref('/favourite/').once('value')
//         .then( response => {
//           // let rawEvents = response.data;
//           let rawEvents = response.val();
//
//           console.dir(rawEvents);
//
//           let filteredEvents = [];
//           for(let i=0; i <rawEvents.length;i++){
//
//             let eventA = rawEvents[i];
//             if(eventA != null){
//               console.log(eventA)
//
//               let sdate = Date.parse(eventA.START_DATE);
//               let edate = Date.parse(eventA.END_DATE);
//               let startDateArr = eventA.START_DATE.split(" ");
//               let endDateArr = eventA.END_DATE.split(" ");
//               let startDate = startDateArr[1];
//               let endDate = endDateArr[1];
//               startDate = this.tConvert(startDate);
//               endDate = this.tConvert(endDate);
//               eventA.START_DATE = startDateArr[0] + " " + startDate;
//               eventA.END_DATE = endDateArr[0] + " " + endDate;
//
//               filteredEvents.push(eventA);
//             }
//           }
//           console.log(rawEvents);
//           this.setState({events: filteredEvents});
//
//         });
//
//         this.setState({favourite:false})
//
//
//     } else {
//
//
//       // axios.get( '/events.json' )
//         database.ref('/').once('value')
//           .then( response => {
//             // let rawEvents = response.data;
//             let rawEvents = response.val();
//             let filteredEvents = [];
//             console.dir(rawEvents);
//
//             if(!this.state.all){
// console.log(rawEvents);
//               // =======================This is if distance is everything ============================
//               if(this.state.distance ==10){
//
//                 for( let eventA of rawEvents){
//                   let sdate = Date.parse(eventA.START_DATE);
//                   let edate = Date.parse(eventA.END_DATE);
//                   let startDateArr = eventA.START_DATE.split(" ");
//                   let endDateArr = eventA.END_DATE.split(" ");
//                   let startDate = startDateArr[1];
//                   let endDate = endDateArr[1];
//                   startDate = this.tConvert(startDate);
//                   endDate = this.tConvert(endDate);
//                   eventA.START_DATE = startDateArr[0] + " " + startDate;
//                   eventA.END_DATE = endDateArr[0] + " " + endDate;
//
//                   if (this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate)){
//                     filteredEvents.push(eventA);
//                   }
//                   else if(eventA.CATEGORY === this.state.activity && (sdate >= this.state.startDate && edate <=this.state.endDate)){
//                     filteredEvents.push(eventA);
//                   }
//                 }
//
//
//               } else {
//                 console.log(this.state.distance)
//                 console.log(rawEvents);
//                 // ===========================================This is if distance is required========
//                 for( let eventA of rawEvents){
//                   // console.log(Date.parse(eventA.START_DATE))
//                   let sdate = Date.parse(eventA.START_DATE);
//                   let edate = Date.parse(eventA.END_DATE);
//                   let startDateArr = eventA.START_DATE.split(" ");
//                   let endDateArr = eventA.END_DATE.split(" ");
//                   let startDate = startDateArr[1];
//                   let endDate = endDateArr[1];
//                   startDate = this.tConvert(startDate);
//                   endDate = this.tConvert(endDate);
//                   eventA.START_DATE = startDateArr[0] + " " + startDate;
//                   eventA.END_DATE = endDateArr[0] + " " + endDate;
//
//                   if(eventA.LOCATION){
//                     new Promise((resolve)=>{
//                       let x = this.distanceBool(eventA.LOCATION)
//
//                       resolve(x)
//                     }).then((res)=>{
//                       let dist = parseFloat(res);
//                       console.log(dist)
//                       if(this.state.distance ==5 && dist > this.state.distance){
//                         this.setState({distBool: true})
//                       } else if (this.state.distance ==4.9 && dist<5 && dist>1){
//                         this.setState({distBool: true})
//                       } else if (this.state.distance ==1 && dist<1){
//                         this.setState({distBool: true})
//                       }
//                       eventA.DISTANCE = res;
//                       // console.log(this.state.distance);
//                       // console.log(this.state.distBool);
//                       if (this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate) && this.state.distBool ){
//                         filteredEvents.push(eventA);
//                       } else if(eventA.CATEGORY === this.state.activity && (sdate >= this.state.startDate && edate <=this.state.endDate) &&this.state.distBool){
//                         filteredEvents.push(eventA);
//                       }
//                     }).then(()=>{
//                       this.setState({distBool: false});
//                     })
//
//                   }
//                 }
//               }
//
//             } else {
//               console.log(rawEvents);
//               let test =  Object.keys(rawEvents).map(function(key) {
//                 return [Number(key), rawEvents[key]];
//               });
//               for( let eventA of test){
//                 console.log(eventA);
//                 // console.log(Date.parse(eventA.START_DATE))
//                 let date = Date.parse(eventA.START_DATE);
//                 let tmpEndDate = Date.parse(eventA.END_DATE);
//                 let startDateArr = eventA.START_DATE.split(" ");
//                 let endDateArr = eventA.END_DATE.split(" ");
//                 let startDate = startDateArr[1];
//                 let endDate = endDateArr[1];
//                 startDate = this.tConvert(startDate);
//                 endDate = this.tConvert(endDate);
//                 eventA.START_DATE = startDateArr[0] + " " + startDate;
//                 eventA.END_DATE = endDateArr[0] + " " + endDate;
//                 if(tmpEndDate >= Date.now()){
//                   filteredEvents.push(eventA);
//                 }
//
//               }
//             }
//             this.setState({events: filteredEvents});
//           } )
//           .catch( error => {
//               console.log( error );
//           } );
//       }//This is for the beginning if statement
//   }
  tConvert = (time) => {
      // Check correct time format and split into components
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join (''); // return adjusted time or original string
    }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render() {

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
                subtitle={
                  <div>
                    Start: <span><b>{res.START_DATE}</b></span>
                    <br/>
                    End: <span><b>{res.END_DATE}</b></span>
                    <br/>
                    {res.DISTANCE ? <span> Distance {res.DISTANCE} </span> : null}
                  </div>
                }>
                <IconButton
                  tooltip="bottom-right"
                  touch={true}
                  tooltipPosition="bottom-right"
                  onClick={()=>{this.favouriteEvent(res,i)}}>
                  <ActionGrade />
                </IconButton>
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
// <GoogleMap
//   defaultZoom={8}
//   defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
// >
//   {<Marker position={{ lat: this.state.latitude, lng: this.state.longitude }} />}
// </GoogleMap>

export default View;
