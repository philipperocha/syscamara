import React, { Component } from 'react';
import {
  AppRegistry,
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


export default class App extends Component {

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
        return (<CenaVereadores navigator={navigator} firebase={firebaseApp} />);

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

  // render() {

  //   return (

  //     <Navigator
  //       initialRoute={{ id: 'principal' }}
  //       renderScene={(route, navigator) => {
  //         switch (route.id) {
  //           case 'principal':
  //             return (<CenaPrincipal navigator={navigator} />);

  //           case 'vereadores':
  //             return (<CenaVereadores navigator={navigator} />);

  //           case 'contato':
  //             return (<CenaContato navigator={navigator} />);

  //           case 'noticias': 
  //             return (<CenaNoticias navigator={navigator} />);

  //           case 'pautas':
  //             return (<CenaPautas navigator={navigator} />);

  //           default:
  //             return false;
  //         }
  //       }}
  //     />
  //   );
  // }
}

// AppRegistry.registerComponent('PoliticoApp', () => PoliticoApp);
