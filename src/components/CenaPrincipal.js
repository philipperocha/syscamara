
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'
import CenaNoticias from './CenaNoticias';
import CenaPautas from './CenaPautas';
import CenaPoliticos from './CenaPoliticos';
import CenaContato from './CenaContato';
import CenaMais from './CenaMais';

const Navegacao = TabNavigator({
  CenaPoliticos: {screen: CenaPoliticos},
  CenaNoticias: {screen: CenaNoticias},
  CenaPautas: {screen: CenaPautas},
  CenaContato: {screen: CenaContato},
  CenaMais: {screen: CenaMais},
},{
    tabBarOptions:{
        activeTintColor: 'dodgerblue',
        showIcon: true,
        swipeEnabled: true,
        style: {
            backgroundColor: '#004466',
            height: 60,
        },
        tabStyle: {
            // height: 80,
            // width: 80,
        },
        iconStyle: {
            flexGrow: 0,
            marginTop: 1.5
        },
        labelStyle: {
            fontSize: 12,
            color: 'white',
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  
});

export default class CenaPrincipal extends Component{

    render(){
        return(<Navegacao/>)
    }
}