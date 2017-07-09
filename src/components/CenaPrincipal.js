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

const logo = require('../img/logo.png');
const menuVereadores = require('../img/vereadores.jpg');
const menuContato = require('../img/contato.jpg');
const menuNoticias = require('../img/noticias.jpg');
const menuPautas = require('../img/pautas.jpg');

export default class CenaPrincipal extends Component {
  render() {
    return (
			<View>
        <StatusBar 
          //hidden
          backgroundColor='#CCC'
        />

        <BarraNavegacao />

        <View style={styles.logo}>
          <Image source={logo} />
        </View>

        <View style={styles.menu}>

          <View style={styles.menuGrupo}>

            <TouchableHighlight
              underlayColor={'#B9C941'}
              activeOpacity={0.3}
              onPress={() => {
                this.props.navigator.push({ id: 'vereadores' });
              }}
            >
              <Image style={styles.imgMenu} source={menuVereadores} />
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'#61BD8C'}
              activeOpacity={0.3}
              onPress={() => {
                this.props.navigator.push({ id: 'contato' });
              }}
            >
              <Image style={styles.imgMenu} source={menuContato} />
            </TouchableHighlight>
          </View>

          <View style={styles.menuGrupo}>
            <TouchableHighlight
              underlayColor={'#EC7148'}
              activeOpacity={0.3}
              onPress={() => {
                this.props.navigator.push({ id: 'noticias' });
              }}
            >
              <Image style={styles.imgMenu} source={menuNoticias} />
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'#19D1C8'}
              activeOpacity={0.3}
              onPress={() => {
                this.props.navigator.push({ id: 'pautas' });
              }}
            >
              <Image style={styles.imgMenu} source={menuPautas} />
            </TouchableHighlight>



          </View>
        </View>

            {/*<Text style={{ position: 'absolute', top:560, }}>Criado por Philippe e Gabriel</Text>
            <Text style={{ position: 'absolute', top:580, }}>2017</Text>
            <Text style={{ position: 'absolute', top:610, }}>www.lagarto.se.leg.br</Text>*/}

        <View style={styles.footerText}>
            <Text>Criado por: Nuvem Tecnologia, 2017.</Text>
            <Text>www.lagarto.se.leg.br</Text>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
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
