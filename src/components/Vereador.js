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
import BarraNavegacao from './auxiliares/BarraNavegacao';

const vereador = require('../img/vereador/27_foto_parlamentar.jpg');
const detalheVereadores = require('../img/detalhe_vereadores.png');

export default class Vereador extends Component {
  render() {
    return (
		<View>
            <StatusBar 
            //hidden
            backgroundColor='#CCC'
            />

            <BarraNavegacao voltar navigator={this.props.navigator} titulo='Vereador' corDeFundo='black'/>

            <View style={styles.cabecalho}>
                <Image source={detalheVereadores} />
                <Text style={styles.txtTitulo}>Vereadores</Text>
            </View>

            <View style={styles.logo}>
            <Image source={vereador} style={{height: 200, width: 140}} />
            </View>

            <View style={styles.detalheContato}>
                <Text style={styles.txtContato}>-Nome Completo: Alexsandro Carvalho Xisto</Text>
                <Text style={styles.txtContato}>-Apelido: Alex Dentinho</Text>
                <Text style={styles.txtContato}>-Partido: PRB</Text>
                <Text style={styles.txtContato}>-Biografia: Alexsandro Carvalho Xisto, nascido em 99/99/9999 em Lagarto-SE, administrador de empresas, começou na política em 1999...</Text>
                <Text style={styles.txtContato}>-Email: abc@gmail.com</Text>
                <Text style={styles.txtContato}>-Local de Trabalho: Câmara de Lagarto</Text>
                <Text style={styles.txtContato}>-Legislatura: 3º Mandato (2016 - 2020)</Text>
          
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  cabecalho: {
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
