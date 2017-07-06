import React, {Component} from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ToolbarAndroid, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar,  } from "react-native-elements";

export default class Pauta extends Component {

    _handlePress() {
      console.log('Button Pressed!');
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar} title="Pauta" titleColor="green"/>

                <Text style = {styles.buttonTitle}>3ª Sessão - 01/01/2017</Text>
                <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                    <Text style = {styles.buttonText}>Download do Arquivo</Text>
                </TouchableHighlight>
                <Text></Text>
                <Text></Text>
                <Text></Text>

                <Text style = {styles.buttonTitle}>7ª Sessão - 12/04/2017</Text>
                <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                    <Text style = {styles.buttonText}>Download do Arquivo</Text>
                </TouchableHighlight>
                <Text></Text>
                <Text></Text>
                <Text></Text>

                <Text style = {styles.buttonTitle}>9ª Sessão - 22/06/2017</Text>
                <TouchableHighlight style = {styles.button} onPress={this._handlePress()}>
                    <Text style = {styles.buttonText}>Download do Arquivo</Text>
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
        width: 360,
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