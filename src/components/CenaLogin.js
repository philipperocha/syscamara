import React, {Component} from 'react'
import {StatusBar, Image, FlatList, ActivityIndicator, AppRegistry, ListView, ToolbarAndroid, Text, View, StyleSheet, TextInput, TouchableHighlight} from 'react-native'
import BarraNavegacao from './auxiliares/BarraNavegacao';

import firebase from '../data/firebase';

import Icon from 'react-native-vector-icons/FontAwesome';

import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

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

    render(){
        return(
            
            <View style={styles.container}>
            <Image source={require('../img/background-Brasil.png')} style={styles.imgBackground}>
                <View style={styles.containerBarra}>
                    <StatusBar backgroundColor='black'/>
                    <BarraNavegacao titulo='Camara de Lagarto App' corDeFundo='#004466' />
                </View>
                <View style={styles.containerLogin}>
                    <View style={styles.containerInputs}>
                        <TextInput
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
                        </TouchableHighlight>

                        <TouchableHighlight onPress={this._fbAuth} style={[styles.button, {marginTop: 20, height: 40, backgroundColor: '#3b5998'}]} >
                             <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                <Icon
                                    name='facebook'
                                    size={18}
                                    color='white'
                                    style={styles.btnIcon}
                                >
                                    <Text style={styles.btnText}>   Login com Facebook</Text>
                                </Icon>
                            </View> 
                        </TouchableHighlight>
                    </View>
                </View>
            </Image>
            </View>
            
        )
    }

}

const styles = StyleSheet.create({
    imgBackground:{
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    },
    container:{
        flex: 1,
    },
    containerBarra: {
        flex: 1,
    },
    containerLogin: {
        flex:1,
        marginTop: 10,
        marginHorizontal: 10,
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
        marginTop: 30,
        marginBottom: 20,
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