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

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ id: 'principal' }}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'principal':
              return (<CenaPrincipal navigator={navigator} />);

            case 'vereadores':
              return (<CenaVereadores navigator={navigator} />);

            case 'contato':
              return (<CenaContato navigator={navigator} />);

            case 'noticias': 
              return (<CenaNoticias navigator={navigator} />);

            case 'pautas':
              return (<CenaPautas navigator={navigator} />);

            default:
              return false;
          }
        }}
      />
    );
  }
}

//AppRegistry.registerComponent('App', () => App);
