import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

const btnVoltar = require('../../img/btn_voltar.png');

export default class BarraNavegacao extends Component {
  render() {
      if (this.props.voltar) {
			return (
				<View style={[styles.barraTitulo, { backgroundColor: this.props.corDeFundo }]}>
					<TouchableHighlight style={{marginTop: 0}}
						underlayColor={this.props.corDeFundo}
            activeOpacity={0.3}
						onPress={() => {
							this.props.navigator.pop();
						}}
					>
						<Image source={btnVoltar} />
					</TouchableHighlight>
					<Text style={styles.titulo}>{this.props.titulo}}</Text>
				</View>
			);
		}

    return (
			<View style={[styles.barraTitulo, { backgroundColor: this.props.corDeFundo }]}>
				<Text style={styles.titulo}>{this.props.titulo}</Text>
      </View>
    );
     }
}

const styles = StyleSheet.create({
	barraTitulo: {
		//backgroundColor: '#CCC',
		backgroundColor: '#004466',
		padding: 10,
		height: 50,
		flexDirection: 'row',
		
    shadowColor: '#D8D8D8',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: .80,
		elevation: 8
	},
	titulo: {
		top: 0,
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		//color: '#000'
		color: '#1C1C1C'
	}
});