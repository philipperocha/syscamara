import React, {Component} from 'react'
import {StatusBar, Image, FlatList, ActivityIndicator, AppRegistry, ListView, ToolbarAndroid, Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView} from 'react-native'
//import BarraNavegacao from './auxiliares/BarraNavegacao';

import firebase from '../src/data/firebase';

import Icon from 'react-native-vector-icons/FontAwesome';

import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import{GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import customStyles from '../src/components/auxiliares/customStyles';
 
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    LoginButton,
    AccessToken
} = FBSDK;

export default class LoginView extends Component{

  static navigationOptions = {
    title: 'LOGIN',
  };

    constructor(props){
        super(props)

        this.state = {
            logged: false,
            email: '',
            password: '',
            response: '',
        }
        this.signUp = this.signUp.bind(this)
        this.login = this.login.bind(this)
    }

    async signUp(){
        try{
            if (this.state.email == '' || this.state.password == ''){
                alert("É necessário email e senha para criação de um novo usuário!");
                return;
            }
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            this.setState({
                response: 'Conta Criada!'
            })

            this.props.navigator.push({
                id: 'principal'
            })

        }catch(error){
            this.setState({
                response: error.toString()
            })
            alert(error.toString());
        }

    }

    async login(){
        try{
            if (this.state.email == '' || this.state.password == ''){
                alert("É necessário email e senha para LogIn de usuário!");
                return;
            }

            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            this.setState({
                response: 'Usuário Logado!'
            })
            
            this.props.navigator.push({
                id: 'principal'
            })

        }catch(error){
            this.setState({
                response: error.toString()
            })
        }
    }

    _fbAuth(){
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            function(result){
                if (result.isCancelled){
                    alert('Login Cancelado!');
                }else{
                    AccessToken.getCurrentAccessToken().then((accessTokenData) => {
                        const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
                        firebase.auth().signInWithCredential(credential).then((result) => {
                            console.log(result);
                            console.log(firebase.auth().currentUser);
                            // this.setState({
                            //     response: 'Usuário Logado!',
                            //     logged: true
                            // })
                        }, (error) => {
                            console.log(error);
                        })
                    }, (error => {
                        console.log('Erro: ' + error);
                    }))
                }
            }
        )
    }

    _fbLogOut(){
        try{
            LoginManager.logOut();
            firebase.auth().signOut();
            this.setState({ logged: false});
            alert("LogOut com sucesso!")
        }catch(error){
            alert(error);
            console.log(error);
        }
    }

    _googleAuth(){

        GoogleSignin.signIn().then(
            (user) => {
            console.log(user);

            console.log(user.name);

            // GoogleSignin.getAccessToken(user)
            // .then((token) => {
            //     console.log(token);
            // })

            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
            // console.log('token google -> ' + user.accessToken);
            

            //const credential = {token: user.idToken, secret: user.serverAuthCode, provider: 'google', providerId: 'google'}

            firebase.auth().signInWithCredential(credential).then((result) => {
                    console.log(result);
                    // this.props.navigator.push({
                    //     id: 'principal'
                    // })

                }, (error) => {
                    console.log(error);
            })


        }
        
        ).catch((err) => {
            console.log('WRONG SIGNIN', err)
        }).done();
    }

    componentWillMount(){
        GoogleSignin.hasPlayServices({autoResolve: true});
        GoogleSignin.configure({
            webClientId: '566860187383-ant0bjv496hmgdmj3t2hhk9qlqnh5e70.apps.googleusercontent.com'
        });
    }


    render(){
        return(
            <Image source={require('../src/img/background.png')} style={styles.imgBackground}>
            <View style={styles.container}>

                <View style={styles.containerLogo}>
                    <StatusBar backgroundColor='black'/>
                    {/*<BarraNavegacao titulo='SysCamara' corDeFundo='#004466' />*/}
                    <Image source={require('../src/img/logo.png')} style={{width: 150, height: 150, marginTop: 60}}/>
                    <Text style={[customStyles.titulo,{fontSize: 20, color: '#d9d9d9', marginHorizontal: 15, textAlign: 'center'}]}>Câmara Municipal de Lagarto</Text>
                </View>

                <View style={styles.containerLogin}>
                    <View style={{alignItems: 'center', marginBottom: 40}}>

                        <Text style={[customStyles.descricao,{fontSize: 16, color: '#d9d9d9', marginHorizontal: 15, textAlign: 'center'}]}>Escolha abaixo a rede social que deseja utilizar para efetuar o login:</Text>
                        <TouchableHighlight onPress={this._googleAuth} style={[styles.button, {marginTop: 10, height: 40, backgroundColor: '#b24d34'}]} >
                             <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                <Icon
                                    name='google'
                                    size={18}
                                    color='white'
                                    style={styles.btnIcon}
                                >
                                    <Text style={[styles.btnText, {fontWeight: 'bold'}]}>    Login com Google</Text>
                                </Icon>
                            </View> 
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._fbAuth} style={[styles.button, {marginTop: 10, height: 40, backgroundColor: '#3b5998'}]} >
                             <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                <Icon
                                    name='facebook'
                                    size={18}
                                    color='white'
                                    style={styles.btnIcon}
                                >
                                    <Text style={[styles.btnText, {fontWeight: 'bold'}]}>    Login com Facebook</Text>
                                </Icon>
                            </View> 
                        </TouchableHighlight>
                        <Text style={[customStyles.fonteDescricaoItalic, {fontSize: 12, color: '#d9d9d9', marginHorizontal: 15, textAlign: 'center', fontStyle: 'italic'}]}>O aplicativo não postará nada em suas redes sociais sem a sua autorização.</Text>
                    </View>
                </View>
                </View>
            </Image>
        )
    }

}

const styles = StyleSheet.create({
    imgBackground:{
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: 'center', 
        alignItems: 'center',
        height: null,
        width: null,
        //alignSelf: 'stretch',
    },
    container:{
        flex: 1,
    },
    containerLogo: {
        alignItems: 'center',
        flex: 1,
    },
    containerLogin: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 0,
    },
    inputText:{
        backgroundColor: '#FFFFFF',
        height: 40,
        width: 280,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black',
        marginBottom: 10,
    },
    button:{
        height: 40,
        width: 280,
        backgroundColor: '#003566',
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    textButton:{
        color: 'white',
        textAlign: 'center',
    },
    containerInputs:{
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 50,
    },
    btnIcon: {
        height: 25,
        width: 180,
    },
    btnText: {
        fontSize: 14,
        color: 'white',
        marginLeft: 30,
        marginTop: 0,
    }
})