import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView,
  ScrollView,
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CenaProjetos extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Projetos',
        tabBarIcon: ({tintColor}) => (
            <Icon name="pencil-square-o" size={22} color={tintColor} />
        )
  }

  render() {
    return (
        <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <View>
                <StatusBar backgroundColor='black'/>
            </View>
            <Text> PAgina de Projetos </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBarra: {
        flex: 2,
    },
    containerMenu: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        height: 30,
        width: 100,
        backgroundColor: '#003566',
        marginTop: 50,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFF',
        alignSelf: 'center'
    },
    icon:{
        width: 26,
        height: 26,
    }
});
