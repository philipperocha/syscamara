import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, StatusBar, View, Image, TouchableHighlight, ListView, ScrollView} from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';
import firebase from '../src/data/firebase';
import{GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {Tile, List, ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import customStyles from '../src/components/auxiliares/customStyles'

const iconeSair = require('../src/img/icons/exit.png');

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    LoginButton,
    AccessToken
} = FBSDK;

const uiTheme = {
  palette: {
    primaryColor: COLOR.grey800,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20,
    },
  },
};

export default class PerfilView extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
          active: 'Perfil',
        };
      }
    
      static navigationOptions = {
        title: 'Menu',
      };

    navigate() {
        this.props.navigation.navigate('DrawerOpen'); // open drawer
    }

    logOut(){
        try{
            var user = firebase.auth().currentUser;
    
            if (user != null) {
                user.providerData.forEach(function (profile) {
                    console.log('Provider ID -> ' + profile.providerId.toString());
                    if (profile.providerId.toString().indexOf('google') !== -1){
                        GoogleSignin.signOut().then(() => {
                            console.log('LogOut do usuário google com sucesso!');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    }
    
                    if (profile.providerId.toString().indexOf('facebook') !== -1){
                        try{
                            LoginManager.logOut();
                            console.log('LogOut do usuário facebook com sucesso!')
                        }catch(err){
                            console.log(err);
                        }
                    }
                });
            }
            firebase.auth().signOut();
        }catch(error){
            console.log(error);
        }
    }
      
    _fbLogOut(){
        try{
            LoginManager.logOut();
            firebase.auth().signOut();
        }catch(error){
            alert(error);
            console.log(error);
        }
    }

    render() {
        const usuario = firebase.auth().currentUser.displayName;
        const email = firebase.auth().currentUser.email;
        const foto = firebase.auth().currentUser.photoURL;
        const sobre = 'Este aplicativo foi criado em Aracaju-SE, 2017, pela NuvemHost.IN. Tem como finalidade exibir notícias sobre o meio político, assim como Câmaras Municipais. Por meio do SysCamara é possível curtir um político, assim como uma Notícia postada no Feed de Notícias. Outra importante funcionalidade é o acesso às pautas e resultados das Sessões, bem como votação nos projetos de lei.';
        
        return (
        <ThemeProvider uiTheme={uiTheme}>
            <Container>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
            <Toolbar
                leftElement="menu"
                centerElement={[<Text style={[customStyles.titulo,{color: 'white'}]}>{this.state.active}</Text>]}
                onLeftElementPress={() => this.navigate()}
            />

            <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                <ScrollView>
                    <View style={{marginTop: 18}}>
                        <ListItem
                            roundAvatar
                            title={<Text style={[customStyles.renderItemTitle, {marginLeft: 24}]}>{usuario}</Text>} 
                            subtitle={<Text style={[customStyles.renderItemSubtitle, {marginLeft: 24, marginBottom: 8}]}>{email}</Text>}
                            avatar={<Avatar
                                    medium
                                    rounded
                                    source={{uri: foto}}
                                    onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                    />}
                            containerStyle={{ borderBottomWidth: 0 }}
                            hideChevron
                            style={{marginVertical: 4, height: 80, backgroundColor: 'white', justifyContent: 'center', borderBottomWidth: 0.5, borderTopWidth: 0.5}}
                        />
                    </View>
                    <View style={styles.detailsApp}>
                        <Text style={[customStyles.descricao, styles.detailsAppText]}>{sobre}</Text>
                    </View>
                    <View>
                        <ListItem
                            //roundAvatar
                            title={<Text style={[customStyles.descricao, {marginLeft: 10}]}>Sair</Text>}
                            avatar={iconeSair}
                            onPress={this.logOut}
                            hideChevron
                            style={{marginVertical: 4, height: 60, backgroundColor: 'white', justifyContent: 'center', borderBottomWidth: 0.5, borderTopWidth: 0.5}}
                        />
                    </View>
                </ScrollView>
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
detailsApp: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
},
detailsAppText: {
    marginTop: 16,
    marginBottom: 22,
    marginLeft: 12,
    marginRight: 4
},
icon:{
    width: 26,
    height: 26,
}
});
