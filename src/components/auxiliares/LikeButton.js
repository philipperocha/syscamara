import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconButton from './IconButton';

export default class LikeButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			liked: false,
			likedValue: 0
		};
	}

	handlePress() {
		const likedValue = this.state.likedValue;
		this.setState({
			likedValue: this.state.liked ? (likedValue - 1) : (likedValue + 1),
			liked: !this.state.liked
		});
	}

	render() {
		const icon = this.state.liked ? heartIcon : heartIconOutline;
		const iconColor = this.state.liked ? redHeart : superLightGray;
		let numberOfLikes = this.state.likedValue;
		return (
			<View style={styles.likeButton}>
				<View style={{justifyContent: 'center'}}>
					<IconButton onPress={this.handlePress.bind(this)} icon={icon} color={iconColor} size={40} />
				</View>
				<View style={{justifyContent: 'center', marginLeft: 10}}>
					<Text>{numberOfLikes}</Text>
				</View>
			</View>
		)
	}
}

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

const styles = StyleSheet.create({
  likeButton: {
    marginLeft: 0,
    flexDirection: 'row',
  }
});