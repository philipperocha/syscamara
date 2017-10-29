import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20,
    },
  },
};

export default class PoliticosView extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
          active: 'Politicos',
        };
      }
    
      static navigationOptions = {
        title: 'Menu',
      };

    navigate() {
        this.props.navigation.navigate('DrawerOpen'); // open drawer
        }

  render() {
    return (

      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.navigate()}
          />
          
          
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Tela de Políticos
              </Text>
              <Text style={[styles.welcome,{color: 'red', fontWeight:'bold', fontSize: 18}]}>
                AQUI SERÁ a TELA DE POLITICOS.....ASSIM COMO TODAS AS TELAS, ESSA TBM TEM O MENU ALI EM CIMA...
              </Text>
            </View>
          
        </Container>
      </ThemeProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: '#455A64',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});
