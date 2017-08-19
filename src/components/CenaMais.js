import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView,
  ScrollView,
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

import firebase from '../data/firebase';

import BarraNavegacao from './auxiliares/BarraNavegacao';

const iconeSair = require('../img/icons/exit.png');

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
               //navigate('Login');

          this.props.navigator.push({
            id: 'login'
          })

      }catch(error){
          console.log(error);
      }
  }

  render() {
    return (
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <View>
                <StatusBar backgroundColor='black'/>
                <BarraNavegacao titulo='Mais' corDeFundo='#004466'/>
            </View> 
            <ScrollView>
                    <List>
                        <ListItem style={{height: 80, justifyContent: 'center'}}
                            roundAvatar
                            title={firebase.auth().currentUser.displayName} 
                            subtitle={firebase.auth().currentUser.email} 
                            avatar={firebase.auth().currentUser.photoURL} 
                            hideChevron
                        />
                    </List>
                     <List>
                        <ListItem style={{height: 260, justifyContent: 'center'}}
                            roundAvatar
                            title="Aplicativo criado em Aracaju-SE, 2017..."
                            hideChevron
                        />
                    </List> 
                    <List>
                        <ListItem style={{height: 60, justifyContent: 'center'}}
                            //roundAvatar
                            title="Sair" 
                            avatar={iconeSair}
                            onPress={this.logOut.bind(this)}
                            hideChevron
                        />
                    </List>
            </ScrollView>
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
