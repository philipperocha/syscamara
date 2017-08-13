import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import BarraNavegacao from './auxiliares/BarraNavegacao';
import firebase from '../data/firebase';

export default class CenaMais extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Mais',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/bottomBar/mais.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
  }

  async logOut(){
      try{
          await firebase.auth().signOut()
          this.props.navigator.push({
            id: 'Login'
          })

      }catch(error){
          console.log(error);
      }
  }

  render() {
    return (
	    <View>
            <StatusBar backgroundColor='black'/>
            <BarraNavegacao titulo='Mais' corDeFundo='#004466'/>

            <View style={styles.menu}>
                <View style={styles.menuGrupo}>
                    <Text>Caro usuáro, deseja fazer LogOut?</Text>
                    <TouchableHighlight onPress={this.logOut.bind(this)} style={styles.button}>
                        <Text style={styles.buttonText}> LogOut </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  footerText: {
    marginTop: 46,
    alignItems: 'center'
  },
  logo: {
    marginTop: 10,
    alignItems: 'center'
  },
  menu: {
    alignItems: 'center'
  },
  menuGrupo: {
    flexDirection: 'row'
  },
  imgMenu: {
    margin: 10,
    height: 72,
    width: 75,
  },
  button: {
    height: 30,
    width: 100,
    backgroundColor: '#003566',
    alignSelf: 'stretch',
    marginTop: 50,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF',
    alignSelf: 'center'
  },
icon:{
    width: 26,
    height: 26,
}
});
