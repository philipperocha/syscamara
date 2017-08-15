import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView
} from 'react-native';

import BarraNavegacao from './auxiliares/BarraNavegacao';

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
	    <View style={styles.container}>

             <View style={styles.containerBarra}>
                <StatusBar backgroundColor='black'/>
                <BarraNavegacao titulo='Mais' corDeFundo='#004466'/>
            </View>

            <View style={styles.containerMenu}>
                <Text>Caro usuáro, deseja fazer LogOut?</Text>
                <TouchableHighlight onPress={this.logOut.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}> LogOut </Text>
                </TouchableHighlight>
            </View> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBarra: {
        flex: 2,
    },
    containerMenu: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        height: 30,
        width: 100,
        backgroundColor: '#003566',
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
