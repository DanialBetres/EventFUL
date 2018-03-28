import React, {Component} from 'react';
import classes from './View.css';
import {GridList, GridTile} from 'material-ui/GridList';
import SearchBar from 'material-ui-search-bar';
import {createFilter} from 'react-search-input'
import database from '../../../assets/database';
import GoogleMap from 'google-distance-matrix';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import Flexbox from 'flexbox-react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

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
    openSnackBar: false,
    emptyResults:false,


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
    if(this.state.latitude == null || this.state.longitude ==null){
      this.setState({
        latitude: 43.4710453,
        longitude: -80.53913759999999
      })
    }
    let geocoder = new window.google.maps.Geocoder();
    let latlng = new window.google.maps.LatLng(this.state.latitude, this.state.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == window.google.maps.GeocoderStatus.OK) {
          console.dir(results[0]['formatted_address'])
      };
    });


  }

  openModal =() =>{
    this.setState({openModal: true});
  }
  closeModal = () =>{
    this.setState({openModal: false});
  }
  distanceBool = (event) => {
    let destination = [event];
    let location = this;
    let service = new window.google.maps.DistanceMatrixService();
    let currLocation = this.state.latitude + " " + this.state.longitude;
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
 setMarker = (map) => {
  const uluru = { lat: this.state.latitude, lng: this.state.longitude };
  const marker = new window.google.maps.Marker({
    position: uluru,
    map: map
  });
  window.google.maps.event.addListener(marker, 'click', function() {
    const infoWindow = new window.google.maps.InfoWindow({
      content: "<b>Header</b><div>Info Content</div>"
    });
    infoWindow.open(map, marker);
  })
};
  favouriteEvent = (event,i) => {
    database.ref('/569/' + i ).set(event);
    this.handleClick();
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
            // console.dir(rawEvents);

            if(!this.state.all){
              // console.log(rawEvents);
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
                if(filteredEvents.length ==0){
                  console.log("THE EVENT LIST IS EMPTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
                  this.setState({emptyResults:true});
                }


              } else {
                // console.log(this.state.distance)
                // console.log(rawEvents);
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

                  let dist = eventA.PACKETS;
                  // console.log(dist)
                  // if(this.state.distance ==5 && dist > this.state.distance){
                  //   this.setState({distBool: true})
                  // } else if (this.state.distance ==4.9 && dist<5 && dist>1){
                  //   this.setState({distBool: true})
                  // } else if (this.state.distance ==1 && dist<1){
                  //   this.setState({distBool: true})
                  // };

                  if(this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate) && (this.state.distance ==5 && dist > this.state.distance) ){
                    filteredEvents.push(eventA);
                  } else if(this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate) && (this.state.distance ==4.9 && dist<5 && dist>1) ){
                    filteredEvents.push(eventA);
                  } else if(this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate) && (this.state.distance ==1 && dist<1) ){
                    filteredEvents.push(eventA);
                  } else if(eventA.CATEGORY === this.state.activity && (sdate >= this.state.startDate && edate <=this.state.endDate) &&this.state.distBool){
                    filteredEvents.push(eventA);
                  }
                  // if(eventA.LOCATION){
                  //   new Promise((resolve)=>{
                  //     let x = this.distanceBool(eventA.LOCATION)
                  //
                  //     resolve(x)
                  //   }).then((res)=>{
                  //     let dist = parseFloat(res);
                  //     // console.log(dist)
                  //     if(this.state.distance ==5 && dist > this.state.distance){
                  //       this.setState({distBool: true})
                  //     } else if (this.state.distance ==4.9 && dist<5 && dist>1){
                  //       this.setState({distBool: true})
                  //     } else if (this.state.distance ==1 && dist<1){
                  //       this.setState({distBool: true})
                  //     }
                  //     eventA.DISTANCE = res;
                  //     // console.log(this.state.distance);
                  //     // console.log(this.state.distBool);
                  //     if (this.state.activity === "Everything" && (sdate >= this.state.startDate && edate <=this.state.endDate) && this.state.distBool ){
                  //       filteredEvents.push(eventA);
                  //     } else if(eventA.CATEGORY === this.state.activity && (sdate >= this.state.startDate && edate <=this.state.endDate) &&this.state.distBool){
                  //       filteredEvents.push(eventA);
                  //     }
                  //   }).then(()=>{
                  //     this.setState({distBool: false});
                  //   })
                  //
                  // }
                }
                } 
                if(filteredEvents.length ==0){
                  console.log("THE EVENT LIST IS EMPTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
                  this.setState({emptyResults:true});
  
                }
              }

            } else {
              // console.log(rawEvents);
              for( let eventA of rawEvents){
                if(eventA.ID != null){
                  // console.log(eventA);
                  // console.log(Date.parse(eventA.START_DATE))
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
              if(filteredEvents.length ==0){
                console.log("THE EVENT LIST IS EMPTYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
                this.setState({emptyResults:true});

              }
            }
            this.setState({events: filteredEvents});
          } )
          .catch( error => {
              console.log( error );
          } );
      }//This is for the beginning if statement
  }

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
  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {

    const filteredEvents = this.state.events.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const {openModal} = this.state;
    let empty = () =>{
      if (this.state.emptyResults==true){
        console.log("bobbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        this.setState({emptyResults:false})
        alert("No Results Found")
      }
    }
    const mapOptions = {
      zoom: 10,
      center: { lat: this.state.latitude, lng: this.state.longitude }
    }

    let searchResults = filteredEvents.map((res,i) => {

          return (
            <Paper  style={style} zDepth={5} >
              <GridTile
                key={res.ID  + i}
                title={res.TITLE}
                subtitle={
                  <div>
                    <Flexbox flexDirection="row">
                      <Flexbox flexDirection="column">
                         <span>Start: <b>{res.START_DATE}</b></span>
                         <span>End:   <b>{res.END_DATE}</b></span>
                        {res.PACKETS ? <span> Distance: {res.PACKETS} Km</span> : null}
                        <Modal open={openModal} onClose={this.closeModal} little>
                          <p>
                          {res.DETAILS}
                          </p>
                        </Modal>
                      </Flexbox>

                      <IconButton
                        iconStyle={{color:"white", marginLeft:150, marginBottom:50}}
                        tooltip="Favourite This"
                        className={classes.button}
                        touch={true}
                        tooltipPosition="top-right"
                        onClick={()=>{this.favouriteEvent(res,i)}}>
                        <ActionGrade
                           />
                      </IconButton>
                    </Flexbox>



                  </div>
                }>

                {/* <RaisedButton
                  onClick={this.openModal}
                  target="_blank"
                  label="Info"
                  className={classes.button}
                  icon={<FontIcon className="help" />} */}

                <img alt='img' src={res.VIDEO} />

              </GridTile>
              <br/>
              <br/>
              <br/>
              </Paper>
          )

    });
    const style = {
      height: "80%",
      width: "90%",
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    const gridList = {
    width: "95%",
    height: 550,
    overflowY: 'auto',
    margin: "0 auto"
  };

    return (
      <div>
        <Header />
            <br/>
            <br/>
          <Flexbox className={classes.flex}>
          <SearchBar
           onChange={this.searchUpdated}
           onRequestSearch={() => console.log('onRequestSearch')}
           style={{
             margin: '0 auto',
             maxWidth: 500,
           }}
          />
        </Flexbox>
          <br/>
          <br/>
          <br/>
          <div className={classes.root}>
          <GridList
            cols={1}
            cellHeight={250}
            style={gridList}>
            {searchResults}
          </GridList>
          { empty() }

          </div>
          <Snackbar
          open={this.state.open}
          message="Event added to Favorite!"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
        <Footer/>


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
