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

const stackNavigator = StackNavigator({
  Home: {screen: HomeView },
  Noticias: {screen: NoticiasView},
  Politicos: {screen: PoliticosView},
  Projetos: {screen: ProjetosView},
  Sessoes: {screen: SessoesView},
  Perfil: {screen: PerfilView}
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
