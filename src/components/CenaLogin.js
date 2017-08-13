import React, {Component} from 'react'
import {StatusBar, Image, FlatList, ActivityIndicator, AppRegistry, ListView, ToolbarAndroid, Text, View, StyleSheet, TextInput, TouchableHighlight} from 'react-native'
import BarraNavegacao from './auxiliares/BarraNavegacao';

import firebase from '../data/firebase';

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

export default class CenaLogin extends Component{

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
            setTimeout(() => {
                this.props.navigator.push({
                    id: 'principal'
                })
            }, 1500)
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
            setTimeout(() => {
                this.props.navigator.push({
                    id: 'principal'
                })
            }, 1500)
        }catch(error){
            this.setState({
                response: error.toString()
            })
        }
    }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#f2f2f2' }} >

                <StatusBar backgroundColor='black'/>
                <BarraNavegacao titulo='Bem Vindo' corDeFundo='#004466' />

                <View style={styles.containerInputs}>
                    <TextInput
                        placeholderTextColor="grey"
                        placeholder="Email"
                        style={styles.inputText}
                        onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput
                        placeholderTextColor="grey"
                        placeholder="Senha"
                        style={styles.inputText}
                        password={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>

                <TouchableHighlight onPress={this.login} style={[styles.loginButton, styles.button]} >
                    <Text style={styles.textButton}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.signUp} style={[styles.loginButton, styles.button]} >
                    <Text style={styles.textButton}>Novo Cadastro</Text>
                </TouchableHighlight>

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
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 100,
        marginHorizontal: 10,
    },
    inputText:{
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black'
    },
    button:{
        height: 50,
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

    cabecalho: {
        flexDirection: 'row',
        marginTop: 10
    },
    txtTitulo: {
        fontSize: 22,
        //color: '#B9C941',
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10
    },
    detalheVereador: {
        padding: 20,
        marginTop: 20
    },
    txtDetalheVereador: {
        fontSize: 18,
        marginLeft: 20
    },
    listView: {
        flex: 1,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    buttonFacebook: {
        alignItems: 'center'
    }
})