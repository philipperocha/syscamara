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

import BarraNavegacao from './auxiliares/BarraNavegacao';

const iconeSair = require('../img/icons/exit.png');

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
        <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <View>
                <StatusBar backgroundColor='black'/>
                <BarraNavegacao titulo='Contato' corDeFundo='#004466'/>
            </View> 
            <ScrollView>
                    <List>
                        <ListItem style={{height: 60, justifyContent: 'center'}}
                            roundAvatar
                            title="Fone: (79)3631-5252" 
                            subtitle={null} 
                            avatar={null} 
                            hideChevron
                        />
                    </List>
                     <List>
                        <ListItem style={{height: 60, justifyContent: 'center'}}
                            roundAvatar
                            title="Email: atendimento@lagarto.se.leg.br"
                            hideChevron
                        />
                    </List> 
                    <List>
                        <ListItem style={{height: 60, justifyContent: 'center'}}
                            //roundAvatar
                            title="Endereço: Praça da Piedade, 97, Lagarto/SE"
                            avatar={null}
                            onPress={null}
                            hideChevron
                        />
                    </List>
                    <List>
                        <ListItem style={{height: 60, justifyContent: 'center'}}
                            //roundAvatar
                            title="CEP: 49400-000"
                            avatar={null}
                            onPress={null}
                            hideChevron
                        />
                    </List>
            </ScrollView>
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
