import React, {Component} from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ToolbarAndroid, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar,  } from "react-native-elements";

export default class Resultados extends Component {

    _handlePress() {
      console.log('Button Pressed!');
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar} title="Resultados" titleColor="green"/>

                <Text>Sem Resultados no Momento...</Text>

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