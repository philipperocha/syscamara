import React, {Component} from 'react'
import {StatusBar, Image, FlatList, ActivityIndicator, AppRegistry, ListView, ToolbarAndroid, Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView} from 'react-native'
import BarraNavegacao from './auxiliares/BarraNavegacao';

import firebase from '../data/firebase';

import Icon from 'react-native-vector-icons/FontAwesome';

import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import{GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
 
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    LoginButton,
    AccessToken
} = FBSDK;

export default class CenaLogin extends Component{

  static navigationOptions = {
    title: 'LOGIN',
  };

    constructor(props){
        super(props)

        this.state = {
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

                        console.log('token -> ' + accessTokenData.accessToken);
                        console.log(credential);

                        firebase.auth().signInWithCredential(credential).then((result) => {
                            this.setState({
                                response: 'Usuário Logado!'
                            })
                            
                            this.props.navigator.push({
                                id: 'principal'
                            })

                        }, (error) => {
                            console.log(error);
                        })
                    }, (error => {
                        console.log('Some error occured: ' + error);
                    }))
                }
            }
        )
    }

    _googleAuth(){

        GoogleSignin.signIn().then(
            (user) => {
            console.log(user);

            let credential = {token: user.idToken, secret: user.serverAuthCode, provider: 'google', providerId: 'google'}

            firebase.auth().signInWithCredential(credential).then((result) => {
                            
                    this.props.navigator.push({
                        id: 'principal'
                    })

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


            <ScrollView style={styles.container}>

            <Image source={require('../img/background.png')} style={styles.imgBackground}>

                <View style={styles.containerBarra}>
                    <StatusBar backgroundColor='black'/>
                    {/*<BarraNavegacao titulo='SysCamara' corDeFundo='#004466' />*/}
                    <Image source={require('../img/SysCamara.png')} style={{width: 200, height: 200, marginTop: 100}}/>
                </View>
                <View style={styles.containerLogin}>
                    <View style={styles.containerInputs}>
                        
                        {/*<TextInput
                            placeholderTextColor="black"
                            placeholder="Email"
                            style={styles.inputText}
                            onChangeText={(email) => this.setState({email})}
                        />
                        <TextInput
                            placeholderTextColor="black"
                            placeholder="Senha"
                            style={styles.inputText}
                            password={true}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <TouchableHighlight onPress={this.login} style={[styles.loginButton, styles.button]} >
                        <Text style={styles.textButton}>Login</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.signUp} style={[styles.loginButton, styles.button]} >
                            <Text style={styles.textButton}>Novo Cadastro</Text>
                        </TouchableHighlight>*/}
                        <Text style={{fontSize: 14, color: '#d9d9d9', marginLeft: 15, marginRight: 15, textAlign: 'center'}}>Escolha abaixo a rede social que deseja utilizar para efetuar o login:</Text>
                        <TouchableHighlight onPress={this._googleAuth} style={[styles.button, {marginTop: 20, height: 40, backgroundColor: '#b24d34'}]} >
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
                        <Text style={{fontSize: 12, color: '#007399', marginLeft: 15, marginRight: 15, textAlign: 'center', fontStyle: 'italic'}}>O aplicativo não postará nada em suas redes sociais sem a sua autorização.</Text>
                    </View>
                </View>
            </Image>
            </ScrollView>
            
        )
    }

}

const styles = StyleSheet.create({
    imgBackground:{
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: 615,
    },
    container:{
        flex: 1,
    },
    containerBarra: {
        alignItems: 'center',
        flex: 1,
    },
    containerLogin: {
        flex:1,
        marginTop: 0,
        marginHorizontal: 0,
        //backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
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