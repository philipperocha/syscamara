import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, ScrollView, Dimensions, Linking } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import LikeButtonProjetos from './auxiliares/LikeButtonProjetos';
import IconButton from './auxiliares/IconButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../data/firebase';
 
class DetalheProjeto extends Component {

    static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Projetos',
        tabBarIcon: ({tintColor}) => (
            <Icon name="pencil-square-o" size={22} color={tintColor} />
        )
    }

    render() {
        const { codigo, titulo, descricao, fotoPolitico, politico, partido, _key } = this.props.navigation.state.params;

        return (

            <ScrollView style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.profilePicWrap}>
                        <Image style={styles.profilePic} source={{uri: fotoPolitico}}/>
                    </View>
                    <View style={styles.profileDetails}>
                      <Text style={[styles.title]}>{titulo}</Text>
                      <Text style={styles.profile}>Código: {codigo}</Text>
                      <Text style={styles.profile}>Autor: {politico} / {partido}</Text>
                    </View>
                </View>

                <View style={styles.followBar}>
                    <View style={styles.likeButton}>
                        <LikeButtonProjetos currentUser={firebase.auth().currentUser.uid} currentProjeto={_key}/>
                    </View>
                </View>

                <View style={styles.descricao}>
                    <Text style={styles.descricaoProjeto}>{descricao}</Text>
                </View>

            </ScrollView>
        );
  }
}

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
    marginVertical: 20,
    marginHorizontal: 8,
    backgroundColor: '#F2F2F2',
    //borderWidth: 0.5,
  },
  profilePicWrap: {
    width: 70,
    height: 90,
    //borderRadius: 100,
    //borderColor: 'rgba(0,0,0,0.2)',
    borderColor: '#595959',
    borderWidth: 2,
    borderRadius: 2,
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
    marginLeft: 20,
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
  profile:{
    fontSize: 14,
    marginLeft: 8,
  },
  icon:{
    width: 26,
    height: 26,
  },

  descricaoProjeto: {
    fontSize: 14,
  },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 8,
    },
});

export default DetalheProjeto;