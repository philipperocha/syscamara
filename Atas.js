import React, {Component} from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ToolbarAndroid, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar,  } from "react-native-elements";

export default class Atas extends Component {

    _handlePress() {
      console.log('Button Pressed!');
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar} title="Atas" titleColor="green"/>

                <Text style = {styles.buttonTitle}>30ª Sessão Ordinária</Text>
                <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                    <Text style = {styles.buttonText}>Download da Ata (LEGAL)</Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                    <Text style = {styles.buttonText}>Download da Ata (ANAIS)</Text>
                </TouchableHighlight>
                <Text></Text>
                <Text></Text>
                <Text></Text>

                <Text style = {styles.buttonTitle}>26ª Sessão Ordinária</Text>
                <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                    <Text style = {styles.buttonText}>Download da Ata (LEGAL)</Text>
                </TouchableHighlight>
                <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                    <Text style = {styles.buttonText}>Download da Ata (ANAIS)</Text>
                </TouchableHighlight>
                <Text></Text>
                <Text></Text>
                <Text></Text>



            </View>


        );
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: 'green',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'stretch',
        height: 34,
        width: 300,
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