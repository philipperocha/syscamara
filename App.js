import React, { Component } from 'react';
import firebase from './src/data/firebase';
import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'
import {View, Text} from 'react-native'
import CenaLogin from './Telas/login';
import {Root} from './Telas/root';
//import {Root} from './src/components/CenaPrincipal';

export default class PoliticoApp extends Component {

  static navigationOptions = {
    title: null,
  };

  constructor(props){
    super(props)
    this.state = {
      initialView: null,
      userLoaded: false
    }

    this.getInitialView()
    this.getInitialView = this.getInitialView.bind(this)
  }

  getInitialView(){
    firebase.auth().onAuthStateChanged((user) => {
      let initialView = user ? 'principal' : 'login';

      this.setState({
        userLoaded: true,
        initialView 
      })
    })
  }

  render() {
    if(this.state.userLoaded){
      switch(this.state.initialView){
        case 'principal':
          return (<Root navigator={navigator}/>);

        case 'login':
          return (<CenaLogin navigator={navigator} />);

        default:
          return false;
      }

    }else{
      return null;
    }
  }

}