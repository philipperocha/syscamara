
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

import CenaNoticias from './CenaNoticias';
import CenaSessoes from './CenaSessoes';
import CenaPoliticos from './CenaPoliticos';
import CenaContato from './CenaContato';
import CenaMais from './CenaMais';
import DetalhePolitico from './DetalhePolitico';
import DetalheNoticia from './DetalheNoticia';
import DetalheSessao from './DetalheSessao';

//Cena Políticos
export const CenaPoliticosStack = StackNavigator({
  CenaPoliticos: {
    screen: CenaPoliticos,
    navigationOptions: {
      title: 'Politicos',
      //header: null,
      headerMode: 'screen',
    },
  },
  Details: {
    screen: DetalhePolitico,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.toUpperCase()}`,
      headerStyle: styles.transparente,
      //headerTintColor: '#E6E6E6'
      headerTintColor: '#404040'
    }),
  },
});

//Cena Notícias
export const CenaNoticiasStack = StackNavigator({
  CenaNoticias: {
    screen: CenaNoticias,
    navigationOptions: {
      title: 'Noticias',
      headerMode: 'screen',
    },
  },
  Details: {
    screen: DetalheNoticia,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.titulo.toUpperCase()}`,
    }),
  },
});

//Cena Sessões
export const CenaSessoesStack = StackNavigator({
  CenaSessoes: {
    screen: CenaSessoes,
    navigationOptions: {
      title: 'Sessões',
      headerMode: 'screen',

    },
  },
  Details: {
    screen: DetalheSessao,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.titulo.toUpperCase()}`,
    }),
  },
});

//Cena Sessões
export const CenaPerfilStack = StackNavigator({
  CenaMais: {
    screen: CenaMais,
    navigationOptions: {
      title: 'Perfil',
      headerMode: 'screen',
    },
  }
});

export const Navegacao = TabNavigator({
  CenaNoticiasStack: {screen: CenaNoticiasStack},
  CenaPoliticosStack: {screen: CenaPoliticosStack},
  CenaSessoesStack: {screen: CenaSessoesStack},
  CenaPerfilStack: {screen: CenaPerfilStack},
},{
    tabBarOptions:{
        activeTintColor: 'dodgerblue',
        showIcon: true,
        swipeEnabled: true,
        style: {
            backgroundColor: '#F2F2F2',
            height: 50,
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
            fontSize: 11,
            color: '#1C1C1C',
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

const styles = StyleSheet.create({
  transparente:{
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
    //backgroundColor: 'rgba(0,0,0,0)'
  }
});