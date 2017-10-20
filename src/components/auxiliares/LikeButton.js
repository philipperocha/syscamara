import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconButton from './IconButton';
import firebase from '../../data/firebase';

import customStyles from './customStyles';

export default class LikeButton extends Component {

	constructor(props) {
		super(props);

		let fireRef = firebase.database().ref('Politicos/' + this.props.currentPolitico + '/likedByUser');

		this.state = {
			currentUser: this.props.currentUser,
			currentPolitico: this.props.currentPolitico,
			liked: false,
			keyUserFB: null,
			likedValue: 0,
			fireRef: fireRef
		};
	}

	likePolitico() {
		this.state.fireRef.push({
			uid: this.state.currentUser,
		});
	}

	unlikePolitico(){
		this.state.fireRef.child(this.state.keyUserFB).remove();
	}

	handlePress() {
		if (!this.state.liked){
		 	this.likePolitico();
		}else{
			this.unlikePolitico();
		}

		this.setState({
			liked: !this.state.liked
		});
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

				//verificar se o usuario atual já curtiu o politico. Caso positivo, guardamos no estado sua chave.
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

	componentDidMount() {
		this.listenFor(this.state.fireRef);
	}

	render() {
		const icon = this.state.liked ? heartIcon : heartIconOutline;
		const iconColor = this.state.liked ? redHeart : midLightGray;
		let numberOfLikes = this.state.likedValue;
		return (
			<View style={styles.likeButton}>
				<View style={{justifyContent: 'center'}}>
					<IconButton onPress={this.handlePress.bind(this)} icon={icon} color={iconColor} size={32} />
				</View>
				<View style={{justifyContent: 'center', marginLeft: 2}}>
					<Text style={customStyles.descricao}>{numberOfLikes}</Text>
				</View>
			</View>
		)
	}
}

const whiteColor = '#FFFFFF';
const blackColor = '#000000';
const superLightGray = '#D3D3D3';
const midLightGray = '#bfbfbf';
const lightGray = '#696969';
const redHeart = '#DC143C';
const yellowColor = '#fdf200';
const modalBackground = 'rgba(52,52,52,0.6)';

const heartIcon = 'heart';
const heartIconOutline = 'heart-o';

const styles = StyleSheet.create({
  likeButton: {
    marginLeft: 0,
    flexDirection: 'row',
  }
});