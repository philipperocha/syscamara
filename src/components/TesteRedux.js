import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReduxers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import{
    AppRegistry,
    StyleSheet,
    Text,
    View
}from 'react-native';

class TesteRedux extends Component{

    render(){

        console.log("Hello World!");

        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    To get Started....

                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    fontSize: 20,
  },

});

export default TesteRedux;