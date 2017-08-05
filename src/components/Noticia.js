import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

//importar o componente barra navegação
import BarraNavegacao from './BarraNavegacao';

const noticia = require('../img/noticias/sao_joao_de_cg.jpg');
const detalheNoticia = require('../img/detalhe_noticias.png');

export default class Noticia extends Component {
  render() {
    return (
		<View>
            <StatusBar 
            //hidden
            backgroundColor='#CCC'
            />

            <BarraNavegacao voltar navigator={this.props.navigator} corDeFundo='black'/>

            <View style={styles.cabecalho}>
                <Image source={detalheNoticia} />
                <Text style={styles.txtTitulo}>Notícias</Text>
            </View>

            <View style={styles.cabecalho}>
                <Text style={styles.txtTitulo2}>Feriado de São João em Lagarto</Text>
            </View>

            <View style={styles.logo}>
                <Image source={noticia} style={{height: 200, width: 200}} />
            </View>

            <View style={styles.detalheContato}>
                <Text style={styles.txtContato}>No próximo dia 24 de Junho, a câmara municipal de Lagarto não terá expediente em virtude do feriado de São João...</Text>
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  cabecalho: {
      alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  txtTitulo: {

    fontSize: 22,
    //color: '#B9C941',
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },

  txtTitulo2:{
    fontSize: 22,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },

  detalheContato: {
    
    marginTop: 6,
    padding: 16
  },
  txtContato: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
    //marginLeft: 20
  },


  footerText: {
    marginTop: 46,
    alignItems: 'center'
  },
  logo: {
    marginTop: 10,
    alignItems: 'center'
  },
  menu: {
    alignItems: 'center'
  },
  menuGrupo: {
    flexDirection: 'row'
  },
  imgMenu: {
    margin: 10
  }
});
