import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';

import DrawerMenu from '../Drawer/drawer-toolbar-android';

import HomeView from './home';

import { DrawerNavigator, StackNavigator } from 'react-navigation';

import NoticiasView from './noticias';
import PoliticosView from './politicos';
import ProjetosView from './projetos';
import SessoesView from './sessoes';
import PerfilView from './perfil';

import DetalhePolitico from '../src/components/DetalhePolitico';
import DetalheSessao from '../src/components/DetalheSessao';
import DetalheProjeto from '../src/components/DetalheProjeto';

const stackNavigator = StackNavigator({
  Home: {screen: HomeView },
  Noticias: {screen: NoticiasView},
  Politicos: {screen: PoliticosView},
  Projetos: {screen: ProjetosView},
  Sessoes: {screen: SessoesView},
  Perfil: {screen: PerfilView},

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
      //title: `${navigation.state.params.name.toUpperCase()}`,
      headerStyle: styles.transparente,
      //headerTintColor: '#E6E6E6'
      headerTintColor: '#404040'
    }),
  },
  DetalhesProjeto: {
    screen: DetalheProjeto,
    navigationOptions: ({ navigation }) => ({
      //title: `${navigation.state.params.name.toUpperCase()}`,
      headerStyle: styles.transparente,
      //headerTintColor: '#E6E6E6'
      headerTintColor: '#404040'
    }),
  },

}, {
  headerMode: 'none'
});

export const Root = DrawerNavigator({
  Home: {
    screen: HomeView,
  },
  Stack: {
    screen: stackNavigator
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