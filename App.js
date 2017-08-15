import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native-deprecated-custom-components';
import {View, Text} from 'react-native'

import CenaPrincipal from './src/components/CenaPrincipal';
import CenaPoliticos from './src/components/CenaPoliticos';
import CenaContato from './src/components/CenaContato';
import CenaNoticias from './src/components/CenaNoticias';
import CenaPautas from './src/components/CenaPautas';
import Noticia from './src/components/Noticia';
import Vereador from './src/components/Vereador';

import CenaLogin from './src/components/CenaLogin';
import firebase from './src/data/firebase';

export default class PoliticoApp extends Component {

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
      let initialView = user ? 'principal' : 'login'

      this.setState({
        userLoaded: true,
        initialView
      })
    })
  }

  renderScene(route, navigator){
    var globalProps = {navigator}
    switch(route.id){
      case 'principal':
        return (<CenaPrincipal navigator={navigator}/>);

      case 'login':
        return (<CenaLogin navigator={navigator} />);

      case 'vereadores':
        return (<CenaPoliticos navigator={navigator} />);

      case 'contato':
        return (<CenaContato navigator={navigator} />);

      case 'noticias': 
        return (<CenaNoticias navigator={navigator} />);

      case 'pautas':
        return (<CenaPautas navigator={navigator} />);

      default:
        return false;
    }
  }

  configureScene(route){
    if(route.sceneConfig){
      return route.sceneConfig
    }else{
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJumpFromRight,
        gestures: {}
      });
    }
  }


  render() {

    if(this.state.userLoaded){
      return (
        <Navigator
          initialRoute={{
            id: this.state.initialView
          }}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />
      );
    }else{
      return null;
    }
  }

}