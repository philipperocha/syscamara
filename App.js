import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';

export default class App extends React.Component {

  _handlePress() {
    console.log('Button Pressed!');
  }

  render() {
    return (
      
      <View style={styles.container}>

        <Image style={{ position: 'absolute', width: 350, height: 220, top:40, }} source={require('./img/logo.png')} />

        <TouchableHighlight style={styles.fullWidthButton} onPress={this._handlePress()}>
            <Text style={styles.fullWidthButtonText}>Vereadores</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} onPress={this._handlePress()}>
            <Text style={styles.fullWidthButtonText}>Notícias</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} onPress={this._handlePress()}>
            <Text style={styles.fullWidthButtonText}>Pautas</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.fullWidthButton} onPress={this._handlePress()}>
            <Text style={styles.fullWidthButtonText}>Fale Conosco</Text>
        </TouchableHighlight>

        {/*<Button style={{height: 100, minWidth: 1000}} onPress={() => this._handlePress()} title="Vereadores" color="green" accessibilityLabel="Learn more about Vereadores button" />
        <Button style={{height: 100}} onPress={() => this._handlePress()} title="Notícias" color="green" accessibilityLabel="Learn more about Notícias button" />
        <Button style={{height: 100}} onPress={() => this._handlePress()} title="Pautas" color="green" accessibilityLabel="Learn more about Pautas button" />*/}

        <Text style={{ position: 'absolute', top:560, }}>Criado por Philippe e Gabriel</Text>
        <Text style={{ position: 'absolute', top:580, }}>2017</Text>
        <Text style={{ position: 'absolute', top:610, }}>www.lagarto.se.leg.br</Text>

        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthButton: {
    top: 40,
    backgroundColor: 'green',
    height:40,
    width: 280,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  fullWidthButtonText: {
    
    fontSize:24,
    color: 'white'
  }

});
