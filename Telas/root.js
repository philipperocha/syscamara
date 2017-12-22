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
      headerStyle: styles.transparente,
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
);

export const Root = DrawerNavigator({
  Home: {
    screen: HomeView,
  },
  Stack: {
    screen: stackNavigator
  }
}, {
  contentComponent: DrawerMenu,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

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
  },
});