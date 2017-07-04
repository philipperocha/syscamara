import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, ToolbarAndroid } from 'react-native';

export default class VereadoresLista extends React.Component {

    _handlePress() {
      console.log('Button Pressed!');
    }

    render(){
        return(
        
            <View style={styles.container}>

              <ToolbarAndroid style={styles.toolbar} title="VEREADORES" titleColor="green"/>

                            
              <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                  <Text style = {styles.buttonText}>Jailton da Mercearia</Text>
              </TouchableHighlight>

              <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                  <Text style = {styles.buttonText}>Alex Dentinho</Text>
              </TouchableHighlight>

              <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                  <Text style = {styles.buttonText}>Itamar Santana</Text>
              </TouchableHighlight>

              <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                  <Text style = {styles.buttonText}>Baiano do Treze</Text>
              </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  buttonText:{
      
      fontSize: 20,
      color: 'white',
  },
  button:{
        backgroundColor: 'green',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'stretch',
        height: 34,
        width: 240,
        borderRadius: 1,
        margin: 6,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 28,
  },
  toolbar:{
        
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 50,
        width: 400,
        backgroundColor: 'silver',
        //color: 'white',
   },
  container: {
    top: 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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