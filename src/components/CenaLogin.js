import React, {Component} from 'react'
import {StatusBar, Image, FlatList, ActivityIndicator, AppRegistry, ListView, ToolbarAndroid, Text, View, StyleSheet, TextInput, TouchableHighlight} from 'react-native'
import BarraNavegacao from './auxiliares/BarraNavegacao';

import firebase from '../data/firebase';

import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

const FBSDK = require('react-native-fbsdk');
const {
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
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            this.setState({
                response: 'Conta Criada!'
            })
            //const { navigate } = this.props.navigation;
            setTimeout(() => {
                //navigate('principal');
                this.props.navigator.push({
                    id: 'principal'
                })
            }, 500)
        }catch(error){
            this.setState({
                response: error.toString()
            })
        }

    }

    async login(){
        try{
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            this.setState({
                response: 'Usuário Logado!'
            })
            
            this.props.navigator.push({
                id: 'principal'
            })

            // //const { navigate } = this.props.navigation;
            // setTimeout(() => {
            //     //navigate('principal');
            //     this.props.navigator.push({
            //         id: 'principal'
            //     })
            // }, 500)
        }catch(error){
            this.setState({
                response: error.toString()
            })
        }
    }

    render(){
        return(
            
            <View style={styles.container}>
            <Image source={require('../img/back-br.png')} style={styles.imgBackground}>
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
                    </View>

                    <LoginButton
                        publishPermissions={["publish_actions"]}
                        onLoginFinished={
                        (error, result) => {
                        if (error) {
                            alert("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                            (data) => {
                                alert(data.accessToken.toString())
                            }
                            )
                        }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")}/>
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
        marginBottom: 40,
    },
    inputText:{
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
})