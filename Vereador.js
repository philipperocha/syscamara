import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, ToolbarAndroid } from 'react-native';

export default class Vereador extends React.Component {

    render(){
        return (
        
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar} title="Jailton da Mercearia" titleColor="green"/>
                <Image style={{width: 220, height: 280}} source={require('./img/vereador/Jailton_Patricio_Do_Nascimento.jpg')} />
                <Text style={{textAlign: 'center', fontSize: 20, }}>Jailton da Mercearia </Text>
                <Text style={{textAlign: 'center', fontSize: 20, }}>PRP </Text>
                <Text style={{textAlign: 'center', fontSize: 20, }}>Mandato: 18º (2017 - 2020) </Text>
                <Text style={{textAlign: 'center', fontSize: 20, }}>Email: jailton@gmail.com </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        height: 30,
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