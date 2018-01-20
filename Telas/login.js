import React, {Component} from 'react'
import {StatusBar, Image, FlatList, ActivityIndicator, AppRegistry, ListView, 
    ToolbarAndroid, Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView, 
    Modal, Dimensions, ImageBackground} from 'react-native';
import firebase from '../src/data/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import{StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import customStyles from '../src/components/auxiliares/customStyles';

const FBSDK = require('react-native-fbsdk');
const {LoginManager, LoginButton, AccessToken} = FBSDK;

console.disableYellowBox = true;
 
export default class LoginView extends Component{

  static navigationOptions = {
    title: 'LOGIN',
  };

    constructor(props){
        super(props)

        this.state = {
            animating: false,
            logged: false,
            email: '',
            password: '',
            response: '',
            modalVisible: false,
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
            if (this.state.password.length < 6){
                alert("A senha deve possuir no mínimo 6 caracteres!");
                return;
            }
            this.setState({ animating: true });
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            this.setState({ animating: false });

        }catch(error){
            this.setState({ animating: false });
            alert(error.toString());
        }

    }

    async login(){
        try{
            if (this.state.email == '' || this.state.password == ''){
                alert("É necessário email e senha para login do usuário!");
                return;
            }
            this.setState({ animating: true });
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            this.setState({ animating: false });

        }catch(error){
            this.setState({ animating: false });
            alert(error.toString());
        }
    }

    _fbAuth = async () => {

        try{
            this.setState({ animating: true });

            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw new Error('Please sign in before continue');
            }
            const tokenData = await AccessToken.getCurrentAccessToken();
            const token = tokenData.accessToken.toString();
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const user = await firebase.auth().signInWithCredential(credential);

            this.setState({ animating: false });

        } catch (error) {
            this.setState({ animating: false, });
            console.log(error.message);
        }
    }

    componentWillMount(){

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){

        const telaWidth = Dimensions.get('window').width;
		const telaHeight = Dimensions.get('window').height;
        const largura = (telaWidth - (telaWidth*0.1));
        const altura = (telaHeight - (telaHeight*0.2));
        
        if (this.state.animating){
            return (
                <Image source={require('../src/img/background_loading.png')} style={[styles.imgBackground]}>
                    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                        
                            <Text style={[customStyles.descricaoItalic, {fontSize: 18, color: '#d9d9d9', marginHorizontal: 15, 
                                textAlign: 'center', backgroundColor: 'transparent', marginBottom: 30}]}>
                                Aguarde...
                            </Text>
                            <ActivityIndicator
                            //animating={this.state.animating}
                            color="87cac0"
                            size="large"
                            />
                        
                    </View>
                </Image>
            );
        }else{
            return(
                <Image source={require('../src/img/background.png')} style={styles.imgBackground}>
                    <View style={styles.container}>

                        <View style={styles.containerLogo}>
                            <StatusBar backgroundColor='black'/>
                            {/*<BarraNavegacao titulo='SysCamara' corDeFundo='#004466' />*/}
                            <Image source={require('../src/img/logo.png')} style={{width: 150, height: 150, marginTop: 60}}/>
                            <Text style={[customStyles.titulo,{fontSize: 20, color: '#d9d9d9', marginHorizontal: 15, textAlign: 'center', backgroundColor: 'transparent'}]}>Câmara Municipal de Lagarto</Text>
                        </View>

                        <View style={styles.containerLogin}>
                            <View style={{alignItems: 'center', marginBottom: 40}}>

                                <Text style={[customStyles.descricao,{fontSize: 16, color: '#d9d9d9', marginHorizontal: 15, textAlign: 'center', backgroundColor: 'transparent'}]}>Escolha uma opção para efetuar o login:</Text>
                                


                                <TouchableHighlight onPress={this._fbAuth} style={[styles.button, {marginTop: 10, height: 40, backgroundColor: '#3b5998'}]} >
                                    <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                        <Icon name='facebook' size={18} color='white' style={styles.btnIcon}>
                                            <Text style={[styles.btnText, {fontWeight: 'bold'}]}>    Login com Facebook</Text>
                                        </Icon>
                                    </View> 
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.button, {marginTop: 10, height: 40, backgroundColor: 'transparent', borderWidth: 0}]} underlayColor="transparent"
                                                    onPress={() => {
                                                        this.setModalVisible(true)
                                                    }}>
                                                    <View style={{alignSelf: 'center', alignItems: 'center'}}>
                                                        <Text style={[customStyles.descricao, styles.btnText,{marginLeft: 0, color: '#7194a8'}]}>Entrar com Email</Text>
                                                    </View>
                                </TouchableHighlight>
                                <Text style={[customStyles.fonteDescricaoItalic, {fontSize: 12, color: '#d9d9d9', marginHorizontal: 15, textAlign: 'center', fontStyle: 'italic', backgroundColor: 'transparent'}]}>O aplicativo não postará nada em suas redes sociais sem a sua autorização.</Text>
                            </View>
                        </View>

                        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {console.log("Modal has been closed.")}}>
                            <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                                <View style={{backgroundColor: '#e6e6e6',justifyContent: 'center',height: altura, width: largura, borderWidth: 1, borderRadius: 8, borderColor:'#666666'}}>
                                    <View style={[styles.containerInputs, {marginTop: 80}]}>
                                        <Text style={[customStyles.titulo, {textAlign: 'center', color: '#333333', marginBottom: 24}]}>LOGIN COM EMAIL E SENHA</Text>
                                        <TextInput
                                            placeholderTextColor="grey"
                                            placeholder="Email"
                                            style={styles.inputText}
                                            underlineColorAndroid='transparent'
                                            onChangeText={(email) => this.setState({email})}
                                            autoCorrect={false}
                                        />
                                        <TextInput
                                            placeholderTextColor="grey"
                                            placeholder="Senha"
                                            style={styles.inputText}
                                            underlineColorAndroid='transparent'
                                            password={true}
                                            onChangeText={(password) => this.setState({password})}
                                            autoCorrect={false}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                    <View style={[styles.containerInputs, {}]}>
                                        <TouchableHighlight onPress={this.login} style={[styles.button, {marginBottom: 18}]} >
                                            <Text style={styles.textButton}>Logar</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={this.signUp} style={[styles.button, {marginBottom: 18}]} >
                                            <Text style={styles.textButton}>Cadastrar Usuário</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible); }} style={[styles.button, {marginTop: 9, marginBottom: 18, backgroundColor: 'transparent', borderWidth: 0,}]} >
                                            <Text style={[customStyles.descricao, styles.textButton, {color: '#333333'}]}>Cancelar</Text>
                                        </TouchableHighlight>
                                        <Text style={[customStyles.descricaoItalic, {textAlign: 'center', color: '#333333', marginBottom: 24}]}>Em caso de problemas, contatar o administrador.</Text>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                </Image>
            )
        }
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