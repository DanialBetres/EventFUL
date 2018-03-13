import React, { Component } from 'react';
// import classes from './App.css';
import Layout from './components/Layout/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import firebase from 'firebase';
class App extends Component {
  state = {
    
  }

  render () {

    return (
      <div>
        <MuiThemeProvider>
          <Layout> </Layout>
        </MuiThemeProvider>
       </div>
    );
  }
}

export default App;
