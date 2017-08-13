import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

//importar o componente barra navegação
import BarraNavegacao from './auxiliares/BarraNavegacao';

const detalhePautas = require('../img/detalhe_pautas.png');

export default class CenaPautas extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Pautas',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/bottomBar/pautas.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
  }

  _handlePress() {
    console.log('Button Pressed!');
  }

    
  render() {
    return (
			<View style={{ flex: 1, backgroundColor: '#FFF' }}>
        
        <StatusBar backgroundColor='black'/>
        <BarraNavegacao titulo='Pautas e Sessões' corDeFundo='#004466' />

        <View style={styles.gridPautas}>


          <Text style = {styles.buttonTitle}>Sessões da 3ª Feira</Text>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Pauta</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Resultado</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Atas</Text>
          </TouchableHighlight>
          <Text></Text>
          <Text></Text>
          <Text></Text>

          <Text style = {styles.buttonTitle}>Sessões da 5ª Feira</Text>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Pauta</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Resultado</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Atas</Text>
          </TouchableHighlight>
          <Text></Text>
          <Text></Text>
          <Text></Text>

          <Text style = {styles.buttonTitle}>Sessões Extraordinárias</Text>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Pauta</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Resultado</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
              <Text style = {styles.buttonText}>Atas</Text>
          </TouchableHighlight>


          {/*<Text style={styles.txtPautas}>. Consultoria</Text>
          <Text style={styles.txtPautas}>. Processos</Text>
          <Text style={styles.txtPautas}>. Acompanhamento de Projetos</Text>*/}
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
  detalhePautas: {
    marginTop: 20,
    padding: 10
  },
  txtPautas: {
    fontSize: 18
  },


  buttonTitle:{
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
  },
  buttonText:{
      fontSize: 20,
      color: 'white',
  },
  button:{
        backgroundColor: '#848484',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'stretch',
        height: 34,
        width: 240,
        borderRadius: 1,
        margin: 6,
  },

  gridPautas:{
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  icon:{
    width: 26,
    height: 26,
}
});
