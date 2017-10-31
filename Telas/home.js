import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';

const uiTheme = {
  palette: {
    primaryColor: COLOR.transparent,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20,
    },
  },
};

export default class HomeView extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
          active: 'Home',
        };
      }
    
      static navigationOptions = {
        title: 'Menu',
      };

    navigate() {
        this.props.navigation.navigate('DrawerOpen'); // open drawer
        }

    goTo(setActive, setNavigate){
      
        this.setState({ active: setActive });
        this.props.navigation.navigate(setNavigate);
      
    }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />


          <Image source={require('../src/img/background.png')} style={[styles.imgBackground,{}]}>

            <Toolbar
              leftElement="menu"
              centerElement={''}
              onLeftElementPress={() => this.navigate()}
            />

            <View style={styles.container}>

              <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={[styles.welcome,{color: 'white',fontSize: 18}]}>
                  Bem Vindo,
                </Text>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                  <Image source={require('../src/img/logo.png')} style={[{width: 140, height: 140}]}/>
                </View>
                <Text style={[styles.welcome,{color: 'white',fontSize: 22, fontWeight: 'bold'}]}>
                  Câmara Municipal de Lagarto
                </Text>
              </View>

              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View style={styles.containerButon}>
                  <View>
                    <TouchableHighlight onPress={() => this.goTo('noticias','Noticias')} 
                      style={[styles.button, {borderRightWidth: 2, borderBottomWidth: 2}]} >
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>Notícias</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goTo('politicos','Politicos')}
                      style={[styles.button, {borderRightWidth: 2, borderTopWidth: 2}]} >
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>Políticos</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View>
                    <TouchableHighlight onPress={() => this.goTo('projetos','Projetos')}
                      style={[styles.button, {borderLeftWidth: 2, borderBottomWidth: 2}]} >
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>Projetos</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goTo('sessoes','Sessoes')}
                      style={[styles.button, {borderLeftWidth: 2, borderTopWidth: 2}]} >
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>Sessões</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          </Image>

        </Container>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
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
  imgBackground:{
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center', 
    alignItems: 'center',
    height: null,
    width: null,
    //alignSelf: 'stretch',
  },
  button:{
    height: (Dimensions.get('window').height / 8),
    width: (Dimensions.get('window').width / 2),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 0,
    marginHorizontal: 0,
    borderRadius: 0,
    marginBottom: 0,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255, 0.15)',
  },
  containerButon: {
    flexDirection: 'row',
  },
  buttonText:{
    color: 'white',
    textAlign: 'center'
  }
});
