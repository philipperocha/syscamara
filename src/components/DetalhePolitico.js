import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, ScrollView, Dimensions, Linking } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import LikeButton from './auxiliares/LikeButton';
import IconButton from './auxiliares/IconButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../data/firebase';

import customStyles from './auxiliares/customStyles'
 
class DetalhePolitico extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Politicos',
        tabBarIcon: ({tintColor}) => (
            <Icon name="address-book-o" size={22} color={tintColor} />
        )
  }

  constructor(props) {
		super(props);

    const keyPolitico = this.props.navigation.state.params._key;
		let fireRef = firebase.database().ref('Politicos/' + keyPolitico + '/redesSociais');

		this.state = {
      currentRef: fireRef,
			currentFacebook: '',
			currentTwitter: '',
      currentInstagram: ''

		};
	}

  listenFor(){
    this.state.currentRef.on('value', (dataSnapshot) => {
      this.setState({
				currentFacebook: dataSnapshot.val().facebook,
        currentTwitter: dataSnapshot.val().twitter,
        currentInstagram: dataSnapshot.val().instagram
			});
		});
  }
  
  componentDidMount(){
      this.listenFor();
  }

  facebook(){
    const url = this.state.currentFacebook;
    this.redeSocial(url);
  }

  twitter(){
    const url = this.state.currentTwitter;
    this.redeSocial(url);
  }

  instagram(){
    const url = this.state.currentInstagram;
    this.redeSocial(url);
  }

  redeSocial(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { foto, name, descricao, partido, _key } = this.props.navigation.state.params;

    return (

      <ScrollView style={styles.container}>

        <Image style={styles.backProfile} source={require('../img/back.png')}>
          <View style={styles.header}>
            <View style={styles.profilePicWrap}>
              <Image style={styles.profilePic} source={{uri: foto}}/>

            </View>
              <Text style={[customStyles.titulo, {marginTop: 6}]}>{name}</Text>
              <Text style={customStyles.descricao}>{partido}</Text>
          </View>
        </Image>
        <View style={styles.followBar}>
          <View style={styles.likeButton}>
            <LikeButton currentUser={firebase.auth().currentUser.uid} currentPolitico={_key}/>
          </View>
          <View style={styles.socialNetworks}>
            <View style={{flexDirection: 'row'}}>
              <IconButton onPress={this.facebook.bind(this)} icon={'logo-facebook'} color={'#3b5998'} size={32}/>
              <IconButton onPress={this.instagram.bind(this)} icon={'logo-instagram'} color={'#B40486'} style={{marginLeft: 12}} size={32} />
              <IconButton onPress={this.twitter.bind(this)} icon={'logo-twitter'} color={'#58ACFA'} style={{marginLeft: 12}} size={32} />
            </View>
          </View>
        </View>

        <View style={styles.ProfileDatails}>
          <Text style={customStyles.descricao}>{descricao}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 0
  },
  profilePicWrap: {
    width: 180,
    height: 200,
    //borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 12,
    marginTop: 36
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
  ProfileDatails: {
    backgroundColor: '#F2F2F2',
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 20,
  },
  icon:{
    width: 26,
    height: 26,
}
});

export default DetalhePolitico;
