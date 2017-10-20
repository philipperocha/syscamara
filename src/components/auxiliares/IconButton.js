import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconButton extends Component {

	onPress() {
		if(typeof this.props.onPress === 'function') {
			this.props.onPress();
		}
	}

	render() {
		const icon = this.props.icon;
		const iconColor = this.props.color || superLightGray;
		const size = this.props.size;
		return (
			<TouchableOpacity style={[this.props.style || {}, buttonsStyles.iconButton]}
				onPress={this.onPress.bind(this)}>
				<Icon name={icon} size={size} color={iconColor} />
			</TouchableOpacity>
		)
	}
}

const buttonsStyles = StyleSheet.create({
    iconButton: {
        width: 40,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marginLeftButton: {
		marginLeft: 5
	},
    marginRightButton: {
        marginRight: 5
    }
});

const whiteColor = '#FFFFFF';
const blackColor = '#000000';
const superLightGray = '#D3D3D3';
const lightGray = '#696969';
const redHeart = '#DC143C';
const yellowColor = '#fdf200';
const modalBackground = 'rgba(52,52,52,0.6)';