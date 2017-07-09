import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

const btnVoltar = require('../img/btn_voltar.png');

export default class BarraNavegacao extends Component {
  render() {
      if (this.props.voltar) {
			return (
				<View style={[styles.barraTitulo, { backgroundColor: this.props.corDeFundo }]}>
					<TouchableHighlight style={{marginTop: 28}}
						underlayColor={this.props.corDeFundo}
            activeOpacity={0.3}
						onPress={() => {
							this.props.navigator.pop();
						}}
					>
						<Image source={btnVoltar} />
					</TouchableHighlight>
					<Text style={styles.titulo}>Câmara de Lagarto App</Text>
				</View>
			);
		}

    return (
			<View style={styles.barraTitulo}>
				<Text style={styles.titulo}>Câmara de Lagarto App</Text>
      </View>
    );
     }
}

const styles = StyleSheet.create({
	barraTitulo: {
		//backgroundColor: '#CCC',
		backgroundColor: 'black',
		padding: 10,
		height: 90,
		flexDirection: 'row'
	},
	titulo: {
		top: 28,
		flex: 1,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		//color: '#000'
		color: 'white'
	}
});