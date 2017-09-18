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

import{GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    LoginButton,
    AccessToken
} = FBSDK;

import BarraNavegacao from './auxiliares/BarraNavegacao';
import Icon from 'react-native-vector-icons/FontAwesome';

const iconeSair = require('../img/icons/exit.png');

export default class CenaMais extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Perfil',
        tabBarIcon: ({tintColor}) => (
            <Icon name="user" size={22} color={tintColor} />
        )
  }

  logOut(){
      try{

        var user = firebase.auth().currentUser;

        if (user != null) {
            user.providerData.forEach(function (profile) {

                console.log('Provider ID -> ' + profile.providerId.toString());

                if (profile.providerId.toString().indexOf('google') !== -1){

                    GoogleSignin.signOut().then(() => {
                        alert('LogOut efetuado com sucesso!');
                        console.log('LogOut do usuário google com sucesso!');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }

                if (profile.providerId.toString().indexOf('facebook') !== -1){
                    
                    try{
                        LoginManager.logOut();
                        alert("LogOut efetuado com sucesso!")
                        console.log('LogOut do usuário facebook com sucesso!')
                    }catch(err){
                        console.log(err);
                    }
                }
                // console.log("  Sign-in provider: "+profile.providerId);
                // console.log("  Provider-specific UID: "+profile.uid);
                // console.log("  Name: "+profile.displayName);
                // console.log("  Email: "+profile.email);
                // console.log("  Photo URL: "+profile.photoURL);
            });
        }

        firebase.auth().signOut();
            //navigate('Login');

        // this.props.navigator.push({
        // id: 'login'
        // })

      }catch(error){
          console.log(error);
      }
    }

    _fbLogOut(){
        try{
            LoginManager.logOut();
            firebase.auth().signOut();
            //this.setState({ logged: false});
            alert("LogOut com sucesso!");
        }catch(error){
            alert(error);
            console.log(error);
        }
    }

  render() {
    return (
        <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <View>
                <StatusBar backgroundColor='black'/>
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
                            onPress={this.logOut}
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
