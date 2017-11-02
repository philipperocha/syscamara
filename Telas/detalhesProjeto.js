import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, ScrollView, Dimensions, Linking, StatusBar} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import LikeButtonProjetos from '../src/components/auxiliares/LikeButtonProjetos';
import IconButton from '../src/components/auxiliares/IconButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../src/data/firebase';

import customStyles from '../src/components/auxiliares/customStyles'

class DetalheProjeto extends Component {

    static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: <Text style={[customStyles.bottomBarTitle, {textAlign: 'center', marginBottom: 4, marginTop: -12}]}>Projetos</Text>,
        tabBarIcon: ({tintColor}) => (
            <Icon name="pencil-square-o" size={22} color={tintColor} />
        )
    }

    render() {
        const { codigo, titulo, descricao, fotoPolitico, background, politico, partido, _key } = this.props.navigation.state.params;

        return (

        <View style={{flex: 1}}>
            <StatusBar backgroundColor="black" translucent />
            <ScrollView style={styles.container}>

                <View>
                  <Image style={styles.backPic} source={{uri: background}}/>
                  <Text style={[customStyles.titulo, {marginLeft: 8, marginTop: 12, marginBottom: 6, textAlign: 'center'}]}>{titulo}</Text>
                </View>
                <View style={styles.header}>
                    <View style={styles.profilePicWrap}>
                        <Image style={styles.profilePic} source={{uri: fotoPolitico}}/>
                    </View>
                    <View style={styles.profileDetails}>
                      <Text style={[customStyles.descricao, {marginLeft: 8}]}>Autor: {politico}</Text>
                      <Text style={[customStyles.descricao, {marginLeft: 8}]}>Partido: {partido}</Text>
                    </View>
                </View>

                <View style={styles.followBar}>
                    <View style={styles.likeButton}>
                        <LikeButtonProjetos currentUser={firebase.auth().currentUser.uid} currentProjeto={_key}/>
                    </View>
                </View>

                <View style={styles.descricao}>
                    <Text style={customStyles.descricao}>{descricao}</Text>
                </View>

            </ScrollView>
        </View>
        );
  }
}

const telaWidth = Dimensions.get('window').width;
const telaHeight = Dimensions.get('window').height;
const largura = (telaWidth - (telaWidth*0.1));
const altura = (telaHeight - (telaHeight*0.5));

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  backProfile:{
    flex: 1,
    //flexDirection: 'row',
    //alignContent: 'center',
    width: null,
    alignSelf: 'stretch',
    height: 320,
    //marginTop: 0,
    //alignItems: 'center'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'flex-start',
    //padding: 8,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 8,
    backgroundColor: '#F2F2F2',
    //borderWidth: 0.5,
  },
  profilePicWrap: {
    width: 35,
    height: 45,
    //borderRadius: 100,
    //borderColor: 'rgba(0,0,0,0.2)',
    borderColor: '#595959',
    borderWidth: 1,
    borderRadius: 1,
  },
  backPic:{
    width: telaWidth,
    height: telaWidth/1.7,
    resizeMode: 'stretch',
  },
  profileDetails:{
    flex: 1,
  },
  profilePic: {
    flex: 1,
    width: null, 
    alignSelf: 'stretch',
    //borderRadius: 100,
    //borderColor: '#fff',
    //borderWidth: 4
  },
  followBar:{
    flex: 1,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    //width: "90%",
    height: 50,
    //justifyContent: 'center'

  },
  likeButton: {
    marginLeft: 10,
    flexDirection: 'row',
    //justifyContent: 'center',
    width: (Dimensions.get('window').width / 2)
  },
  socialNetworks: {
    justifyContent: 'center',
  },
  descricao: {
    backgroundColor: '#F2F2F2',
    marginLeft: 12,
    marginTop: 20,
    marginRight: 8,
    marginBottom: 20,
  },
  icon:{
    width: 26,
    height: 26,
  },
  descricaoProjeto: {
    fontSize: 14,
  },

});

export default DetalheProjeto;
