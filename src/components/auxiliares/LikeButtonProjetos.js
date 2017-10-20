import React, { Component } from 'react';
import {TouchableHighlight, Modal, StyleSheet, View, Text, Dimensions} from 'react-native';
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
			fireRef2: fireRef2,

			modalVisible: false,
		};
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
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

	showModal(){
		//alert('Em construcao!');
		this.setModalVisible(true);
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
		let percent = 0;
		if (numberOfHates + numberOfLikes > 0){
			percent = ((numberOfLikes / (numberOfHates + numberOfLikes)) * 100).toFixed(2);
		}

		const telaWidth = Dimensions.get('window').width;
		const telaHeight = Dimensions.get('window').height;
		const largura = (telaWidth - (telaWidth*0.1));
		const altura = (telaHeight - (telaHeight*0.5));

		return (
			<View style={styles.likeButton}>
				<View style={{justifyContent: 'center'}}>
					<IconButton onPress={this.handlePress.bind(this)} icon={icon} color={iconColor} size={32} />
				</View>
				<View style={{justifyContent: 'center', marginLeft: 6}}>
					<Text style={customStyles.descricao}>{numberOfLikes}</Text>
				</View>

				<View style={{justifyContent: 'center', marginLeft: 36}}>
					<IconButton onPress={this.handlePressHate.bind(this)} icon={iconHate} color={iconHateColor} size={32} />
				</View>
				<View style={{justifyContent: 'center', marginLeft: 6}}>
					<Text style={customStyles.descricao}>{numberOfHates}</Text>
				</View>

				<View style={{justifyContent: 'center', marginLeft: 60}}>
					<IconButton onPress={this.showModal.bind(this)} icon={chart} color={'#595959'} size={32} />
				</View>
				<View style={{justifyContent: 'center', marginLeft: 6}}>
					<Text style={customStyles.descricao}>{percent} %</Text>
				</View>

                <Modal animationType="fade" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {console.log("Modal has been closed.")}} 
				>
					<View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
						<View style={{backgroundColor: '#e6e6e6',justifyContent: 'space-between',height: altura, width: largura, borderWidth: 1, borderRadius: 8, borderColor:'#666666'}}>
							<View style={{flexDirection: 'column', justifyContent: 'center', marginHorizontal: 10, marginTop: 26}}>
								<Text style={[customStyles.titulo, {textAlign: 'center'}]}>PERCENTUAL DE APROVAÇÃO</Text>
							</View>
							<View style={{flexDirection: 'column', justifyContent: 'center', marginHorizontal: 10, marginVertical: 16}}>
								<Text style={customStyles.descricao}>Total de votos: {(numberOfHates + numberOfLikes)}</Text>
								<Text style={customStyles.descricao}>Votos favoráveis: {numberOfLikes}</Text>
								<Text style={customStyles.descricao}>Votos contra: {numberOfHates}</Text>
								<Text style={customStyles.descricao}>Percentual de aprovação: {percent} %</Text>
							</View>
							<View style={{justifyContent: 'flex-end',alignItems: 'center', marginBottom: 16}}>
								<TouchableHighlight style={[styles.button, {marginTop: 10, height: 40}]}
											onPress={() => {
												this.setModalVisible(!this.state.modalVisible);
											}}>
									<Text style={[customStyles.renderItemTitle, {color: 'white', textAlign: 'center'}]}>Fechar</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>
                </Modal>
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

const thumbsDownOut = 'thumbs-o-down';
const thumbsDown = 'thumbs-down';
const thumbsUpOut = 'thumbs-o-up';
const thumbsUp = 'thumbs-up';
const chart = 'line-chart';

const styles = StyleSheet.create({
  likeButton: {
    marginLeft: 0,
    flexDirection: 'row',
  },
  button:{
    backgroundColor: '#00802b',
    borderWidth: 2,
    borderColor: '#00802b',
    alignItems: 'center',
    justifyContent: 'center',
    //alignSelf: 'stretch',
    height: 34,
    width: 120,
    borderRadius: 4,
    margin: 6,
},
});

