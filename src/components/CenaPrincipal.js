
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
import DetalhePolitico from './DetalhePolitico';
import DetalheNoticia from './DetalheNoticia';

//Cena Políticos
export const CenaPoliticosStack = StackNavigator({
  CenaPoliticos: {
    screen: CenaPoliticos,
    navigationOptions: {
      title: 'Politicos',
      header: null,
    //   headerMode: 'screen',
    //   header: { visible:false },
    },
  },
  Details: {
    screen: DetalhePolitico,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.toUpperCase()}`,
    }),
  },
});

//Cena Notícias
export const CenaNoticiasStack = StackNavigator({
  CenaNoticias: {
    screen: CenaNoticias,
    navigationOptions: {
      title: 'Noticias',
      header: null,
    //   headerMode: 'screen',
    //   header: { visible:false },
    },
  },
  Details: {
    screen: DetalheNoticia,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.titulo.toUpperCase()}`,
    }),
  },
});

export const Navegacao = TabNavigator({
  CenaPoliticosStack: {screen: CenaPoliticosStack},
  CenaNoticiasStack: {screen: CenaNoticiasStack},
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

// export const FeedStack = StackNavigator({
//   CenaPoliticos: {
//       screen: CenaPoliticos
//   },
//   Details: {
//     screen: UserDetails
//     ,
//     navigationOptions: ({ navigation }) => ({
//       title: `${navigation.state.params.name.toUpperCase()}`,
//     }),
//   },
// });

export const Root = StackNavigator({
  Navegacao: {
    screen: Navegacao,
  }
  ,
//   Settings: {
//     screen: SettingsStack,
//   },
}, {
  mode: 'modal',
  headerMode: 'none',
});

// export default class CenaPrincipal extends Component{

//     render(){
//         return(<Navegacao/>)
//     }
// }