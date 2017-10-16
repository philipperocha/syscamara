import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconButton from './IconButton';
import firebase from '../../data/firebase';

import customStyles from './customStyles';

export default class LikeButtonProjetos extends Component {

	constructor(props) {
		super(props);

		let fireRef = firebase.database().ref('Projetos/' + this.props.currentProjeto + '/likedByUser');
		let fireRef2 = firebase.database().ref('Projetos/' + this.props.currentProjeto + '/hatedByUser');

		this.state = {
			currentUser: this.props.currentUser,
			currentProjeto: this.props.currentProjeto,
			liked: false,
			hated: false,
			keyUserFB: null,
			likedValue: 0,
			hatedValue: 0,
			fireRef: fireRef,
			fireRef2: fireRef2
		};
	}

	likeProjeto() {
		this.state.fireRef.push({
			uid: this.state.currentUser,
		});
		
		this.setState({liked: !this.state.liked});
	}

	unlikeProjeto(){
		this.state.fireRef.child(this.state.keyUserFB).remove();

		this.setState({liked: !this.state.liked});
	}

	handlePress() {
		if (!this.state.liked){
			if (this.state.hated){
				this.unHateProjeto();
			}
		 	this.likeProjeto();
		}else{
			this.unlikeProjeto();
		}

	}

	handlePressHate(){
		if (!this.state.hated){
			if (this.state.liked){
				this.unlikeProjeto();
			}
		 	this.hateProjeto();
		}else{
			this.unHateProjeto();
		}
	}

	hateProjeto() {
		this.state.fireRef2.push({
			uid: this.state.currentUser,
		});

		this.setState({hated: !this.state.hated});
	}

	unHateProjeto(){
		this.state.fireRef2.child(this.state.keyUserFB).remove();

		this.setState({hated: !this.state.hated});
	}

	listenFor(fRef) {

		fRef.on('value', (dataSnapshot) => {
			// transform the children to an array
			var data = [];
			dataSnapshot.forEach((child) => {
				data.push({
					uid: child.val().uid,
					_key: child.key
				});

				//verificar se o usuario atual já curtiu a Noticia. Caso positivo, guardamos no estado sua chave.
				//Em caso de DesLike, removemos sua chave do FireBase
				if (child.val().uid == this.state.currentUser){
					this.setState({liked: true, keyUserFB: child.key});
				}

			});

			this.setState({
				likedValue: data.length,
			});
		});
	}

	listenFor2(fRef) {

		fRef.on('value', (dataSnapshot) => {
			// transform the children to an array
			var data = [];
			dataSnapshot.forEach((child) => {
				data.push({
					uid: child.val().uid,
					_key: child.key
				});

				//verificar se o usuario atual já curtiu a Noticia. Caso positivo, guardamos no estado sua chave.
				//Em caso de DesLike, removemos sua chave do FireBase
				if (child.val().uid == this.state.currentUser){
					this.setState({hated: true, keyUserFB: child.key});
				}

			});

			this.setState({
				hatedValue: data.length,
			});
		});
	}

	componentDidMount() {
        //console.log(this.state.fireRef);
		this.listenFor(this.state.fireRef);
		this.listenFor2(this.state.fireRef2);
	}

	render() {
		const icon = this.state.liked ? thumbsUp : thumbsUpOut;
		const iconColor = this.state.liked ? greenColor : lightGray;

		const iconHate = this.state.hated ? thumbsDown : thumbsDownOut;
		const iconHateColor = this.state.hated ? redHeart : lightGray;

		let numberOfLikes = this.state.likedValue;
		let numberOfHates = this.state.hatedValue;
		return (
			<View style={styles.likeButton}>
				<View style={{justifyContent: 'center'}}>
					<IconButton onPress={this.handlePress.bind(this)} icon={icon} color={iconColor} size={34} />
				</View>
				<View style={{justifyContent: 'center', marginLeft: 6}}>
					<Text style={customStyles.descricao}>{numberOfLikes}</Text>
				</View>

				<View style={{justifyContent: 'center', marginLeft: 36}}>
					<IconButton onPress={this.handlePressHate.bind(this)} icon={iconHate} color={iconHateColor} size={34} />
				</View>
				<View style={{justifyContent: 'center', marginLeft: 6}}>
					<Text style={customStyles.descricao}>{numberOfHates}</Text>
				</View>
			</View>
		)
	}
}

const greenColor = '#009900';
const whiteColor = '#FFFFFF';
const blackColor = '#000000';
const superLightGray = '#D3D3D3';
const lightGray = '#696969';
const redHeart = '#DC143C';
const yellowColor = '#fdf200';
const modalBackground = 'rgba(52,52,52,0.6)';

const closeIcon = 'md-close';
const menuIcon = 'md-menu';
const searchIcon = 'md-search';
const addIcon = 'md-add';
const locationIcon = 'md-compass';
const commentIcon = 'md-chatbubbles';
const moreIcon = 'md-more';
const imagesIcon = 'md-images';
const checkmarkIcon = 'md-checkmark';
const heartIcon = 'md-heart';
const heartIconOutline = 'md-heart-outline';
const thumbsDownOut = 'ios-thumbs-down-outline';
const thumbsDown = 'ios-thumbs-down';
const thumbsUpOut = 'ios-thumbs-up-outline';
const thumbsUp = 'ios-thumbs-up';

const styles = StyleSheet.create({
  likeButton: {
    
    marginLeft: 0,
    flexDirection: 'row',
  }
});