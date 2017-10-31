import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Platform
} from 'react-native';

import DrawerMenu from '../Drawer/drawer-toolbar-android';

import HomeView from './home';

import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';

import customStyles from '../src/components/auxiliares/customStyles'

import NoticiasView from './noticias';
import PoliticosView from './politicos';
import ProjetosView from './projetos';
import SessoesView from './sessoes';
import PerfilView from './perfil';

import DetalhePolitico from './detalhesPolitico';
import DetalheSessao from './detalhesSessao';
import DetalheProjeto from './detalhesProjeto';

const stackNavigator = StackNavigator({
  Home: {screen: HomeView, navigationOptions: {title: 'Home', header: null, headerMode: 'screen'}},
  Noticias: {screen: NoticiasView, navigationOptions: {title: 'Notícias', header: null, headerMode: 'screen'}},
  Politicos: {screen: PoliticosView, navigationOptions: {title: 'Politicos', header: null, headerMode: 'screen'}},
  Projetos: {screen: ProjetosView, navigationOptions: {title: 'Projetos', header: null, headerMode: 'screen'}},
  Sessoes: {screen: SessoesView, navigationOptions: {title: 'Sessões', header: null, headerMode: 'screen'}},
  Perfil: {screen: PerfilView, navigationOptions: {title: 'Perfil', header: null, headerMode: 'screen'}},

  DetalhesPolitico: {
    screen: DetalhePolitico,
    navigationOptions: ({ navigation }) => ({
      //title: `${navigation.state.params.name.toUpperCase()}`,
      headerStyle: styles.transparente,
      //headerTintColor: '#E6E6E6'
      headerTintColor: '#404040'
    }),
  },
  DetalhesSessao: {
    screen: DetalheSessao,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={customStyles.titulo}>{navigation.state.params.descricao.toUpperCase()}</Text>,
      headerStyle: {paddingTop: 30, height: 80},
    }),
  },
  DetalhesProjeto: {
    screen: DetalheProjeto,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={customStyles.titulo}>{navigation.state.params.codigo.toUpperCase()}</Text>,
      headerStyle: {paddingTop: 30, height: 80},
    }),
  },

},
  // {
  //   cardStyle: {
  //     paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  //   }
  // }

  // ,
  // {
  //   //headerMode: 'none',
  //   mode: 'modal',
  // },
);

export const Root = DrawerNavigator({
  Home: {
    screen: HomeView,
  },
  Stack: {
    screen: stackNavigator
    //screen: RootNav
  }
}, {
  contentComponent: DrawerMenu,
  contentOptions: {
    activeTintColor: '#e91e63',
    style: {
      flex: 1,
      paddingTop: 15,
    }
  }
});


// //<<<------MIGRADO------>>>>//

// //Cena Políticos
// export const CenaPoliticosStack = StackNavigator({
//   CenaPoliticos: {
//     screen: PoliticosView,
//     navigationOptions: {
//       title: 'Politicos',
//       header: null,
//       headerMode: 'screen',
//     },
//   },
//   DetalhesPolitico: {
//     screen: DetalhePolitico,
//     navigationOptions: ({ navigation }) => ({
//       //title: `${navigation.state.params.name.toUpperCase()}`,
//       headerStyle: styles.transparente,
//       //headerTintColor: '#E6E6E6'
//       headerTintColor: '#404040'
//     }),
//   },
// });

// //Cena Notícias
// export const CenaFeedNoticiasStack = StackNavigator({
//   CenaFeedNoticias: {
//     screen: NoticiasView,
//     navigationOptions: {
//       title: 'Noticias',
//       header: null,
//       headerMode: 'screen',
//     },
//   },
// });

// //Cena Sessões
// export const CenaSessoesStack = StackNavigator({
//   CenaSessoes: {
//     screen: SessoesView,
//     navigationOptions: {
//       title: 'Sessões',
//       header: null,
//       headerMode: 'screen',

//     },
//   },
//   DetalhesSessao: {
//     screen: DetalheSessao,
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: <Text style={customStyles.titulo}>{navigation.state.params.descricao.toUpperCase()}</Text>,
//     }),
//   },
// });

// //Cena Perfil
// export const CenaPerfilStack = StackNavigator({
//   CenaPerfil: {
//     screen: PerfilView,
//     navigationOptions: {
//       title: 'Perfil',
//       header: null,
//       headerMode: 'screen',
//     },
//   }
// });

// //Cena Projetos
// export const CenaProjetosStack = StackNavigator({
//   CenaProjetos: {
//     screen: ProjetosView,
//     navigationOptions: {
//       title: 'Projetos de Lei',
//       header: null,
//       headerMode: 'screen',
//     },
//   },
//   DetalhesProjeto: {
//       screen: DetalheProjeto,
//       navigationOptions: ({ navigation }) => ({
//         headerTitle: <Text style={customStyles.titulo}>{navigation.state.params.codigo.toUpperCase()}</Text>,
//       }),
//   },
// });

// export const RootNav = StackNavigator({
//   Navegacao: {
//     screen: tabNav,
//   },
// }, {
//   mode: 'modal',
//   headerMode: 'none',
// });


// export const tabNav = TabNavigator({
//   CenaFeedNoticiasStack: {screen: CenaFeedNoticiasStack},
//   CenaPoliticosStack: {screen: CenaPoliticosStack},
//   CenaProjetosStack: {screen: CenaProjetosStack},
//   CenaSessoesStack: {screen: CenaSessoesStack},
//   CenaPerfilStack: {screen: CenaPerfilStack},
// },{
//     tabBarOptions:{
//         activeTintColor: 'dodgerblue',
//         showIcon: true,
//         swipeEnabled: true,
//         style: {
//             backgroundColor: '#F2F2F2',
//             height: 56,
//         },
//         tabStyle: {
//             // height: 80,
//             // width: 80,
//         },
//         iconStyle: {
//             flexGrow: 0,
//             marginTop: 1.5
//         },
//         labelStyle: {
//             fontSize: 11,
//             color: '#1C1C1C',
//         }
//     },
//     tabBarComponent: TabBarBottom,
//     tabBarPosition: 'bottom',
  
// });

// //<<<------MIGRADO------>>>>//



const styles = StyleSheet.create({
  transparente:{
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    height: 80,
    //backgroundColor: 'rgba(0,0,0,0)'
  },
});