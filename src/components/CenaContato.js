import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet
} from 'react-native';

//importar o componente barra navegação
import BarraNavegacao from './auxiliares/BarraNavegacao';

const detalheContato = require('../img/detalhe_contato.png');

export default class CenaContato extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Contato',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/bottomBar/contato.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
  }

  render() {
    return (
			<View style={{ flex: 1, backgroundColor: '#FFF' }}>
        
        <StatusBar backgroundColor='black'/>
        <BarraNavegacao titulo='Contato' corDeFundo='#004466' />

        <View style={styles.detalheContato}>
          <Text style={styles.txtContato}>Fone: (79) 3631-5252</Text>
          <Text style={styles.txtContato}>E-mail: atendimento@lagarto.se.leg.br</Text>
          <Text style={styles.txtContato}>Endereço: Praça da Piedade, 97, Lagarto/SE</Text>
          <Text style={styles.txtContato}>CEP: 49400-000</Text>
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
    
    marginTop: 20,
    padding: 10
  },
  txtContato: {
    fontSize: 16,
    //marginLeft: 20
  },
  icon:{
    width: 26,
    height: 26,
}
});
