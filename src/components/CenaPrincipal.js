
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

import customStyles from './auxiliares/customStyles'

import CenaNoticias from './CenaNoticias';
import CenaFeedNoticias from './CenaFeedNoticias';
import CenaSessoes from './CenaSessoes';
import CenaPoliticos from './CenaPoliticos';
import CenaProjetos from './CenaProjetos';
import CenaPerfil from './CenaPerfil';
import DetalhePolitico from './DetalhePolitico';
import DetalheNoticia from './DetalheNoticia';
import DetalheSessao from './DetalheSessao';
import DetalheProjeto from './DetalheProjeto';

//Cena Políticos
export const CenaPoliticosStack = StackNavigator({
  CenaPoliticos: {
    screen: CenaPoliticos,
    navigationOptions: {
      title: 'Politicos',
      header: null,
      headerMode: 'screen',
    },
  },
  Details: {
    screen: DetalhePolitico,
    navigationOptions: ({ navigation }) => ({
      //title: `${navigation.state.params.name.toUpperCase()}`,
      headerStyle: styles.transparente,
      //headerTintColor: '#E6E6E6'
      headerTintColor: '#404040'
    }),
  },
});

//Cena Notícias
export const CenaFeedNoticiasStack = StackNavigator({
  CenaFeedNoticias: {
    screen: CenaFeedNoticias,
    navigationOptions: {
      title: 'Noticias',
      header: null,
      headerMode: 'screen',
    },
  },

});

//Cena Sessões
export const CenaSessoesStack = StackNavigator({
  CenaSessoes: {
    screen: CenaSessoes,
    navigationOptions: {
      title: 'Sessões',
      header: null,
      headerMode: 'screen',

    },
  },
  Details: {
    screen: DetalheSessao,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={customStyles.titulo}>{navigation.state.params.descricao.toUpperCase()}</Text>,
    }),
  },
});

//Cena Perfil
export const CenaPerfilStack = StackNavigator({
  CenaPerfil: {
    screen: CenaPerfil,
    navigationOptions: {
      title: 'Perfil',
      header: null,
      headerMode: 'screen',
    },
  }
});

//Cena Projetos
export const CenaProjetosStack = StackNavigator({
  CenaProjetos: {
    screen: CenaProjetos,
    navigationOptions: {
      title: 'Projetos de Lei',
      header: null,
      headerMode: 'screen',
    },
  },
  Details: {
      screen: DetalheProjeto,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <Text style={customStyles.titulo}>{navigation.state.params.codigo.toUpperCase()}</Text>,
      }),
  },
});

export const Navegacao = TabNavigator({
  CenaFeedNoticiasStack: {screen: CenaFeedNoticiasStack},
  CenaPoliticosStack: {screen: CenaPoliticosStack},
  CenaProjetosStack: {screen: CenaProjetosStack},
  CenaSessoesStack: {screen: CenaSessoesStack},
  CenaPerfilStack: {screen: CenaPerfilStack},
},{
    tabBarOptions:{
        activeTintColor: 'dodgerblue',
        showIcon: true,
        swipeEnabled: true,
        style: {
            backgroundColor: '#F2F2F2',
            height: 56,
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
  },
});