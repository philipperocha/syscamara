/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import CenaPrincipal from './src/components/CenaPrincipal';
import CenaVereadores from './src/components/CenaVereadores';
import CenaContato from './src/components/CenaContato';
import CenaNoticias from './src/components/CenaNoticias';
import CenaPautas from './src/components/CenaPautas';
import Noticia from './src/components/Noticia';
import Vereador from './src/components/Vereador';

import Login from './src/components/Login';
import firebase from './src/components/firebase';

// import * as firebase from 'firebase'

// const firebaseConfig = {
//   apiKey: "AIzaSyAoACV4fA2Q_47VEKBXu3UrQVdM_Ik_IOI",
//   authDomain: "my-app-5c471.firebaseio.com",
//   databaseURL: "https://my-app-5c471.firebaseio.com/",
//   storageBucket: "",
// };
// firebase.initializeApp(firebaseConfig);

export default class NativeApp2 extends Component {

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
      let initialView = user ? 'principal' : 'Login'

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

      case 'Login':
        return (<Login navigator={navigator}/>);

      case 'vereadores':
        return (<CenaVereadores navigator={navigator} firebase={firebase} />);

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


// render(){
//   return(
//     <CenaVereadores />
//   );
// }

  render() {
    // return(
    //     <View>
    //         <Text styles={{fontSize: 28}}> OLA MUNDO, SEJA BEM VINDO</Text>
    //     </View>
    // );

    if(this.state.userLoaded){
      return (
        // <Principal />
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

AppRegistry.registerComponent('NativeApp2', () => NativeApp2);
