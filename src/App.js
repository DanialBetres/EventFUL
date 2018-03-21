import React, { Component } from 'react';
// import classes from './App.css';
import Layout from './components/Layout/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  state = {

  }

  render () {

    return (
      <div>
        <BrowserRouter>
          <MuiThemeProvider>
            <Layout> </Layout>
          </MuiThemeProvider>
        </BrowserRouter>
       </div>
    );
  }
}

export default App;
