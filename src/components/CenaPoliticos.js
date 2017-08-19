import React, { Component } from 'react';
import { View, StatusBar, Image, Text, StyleSheet, FlatList, ActivityIndicator, AppRegistry, TextInput, ListView, ToolbarAndroid,} from 'react-native';
import { List, ListItem, Separator, SearchBar,  } from "react-native-elements";
import FloatingActionButton from 'react-native-action-button';
import BarraNavegacao from './auxiliares/BarraNavegacao';
import Header from './auxiliares/Header';
import Footer from './auxiliares/Footer';
//import Avatar from './auxiliares/Avatar';
import { Avatar } from 'react-native-material-design';

import firebase from '../data/firebase';

const detalheVereadores = require('../img/detalhe_vereadores.png');


export default class CenaPoliticos extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Politicos',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/bottomBar/politico.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
  }


  constructor(props) {
    super(props);

    let fireRef = firebase.database().ref('Politicos');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource, // dataSource for our list
      newVereador: "", // The name of the new task
      fireRef: fireRef,
    };
  }

  _renderItem(politicos) {
    return (
      <View>
        <ListItem
            roundAvatar
            title={politicos.name}
            subtitle={politicos.partido}
            avatar={politicos.foto}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={() => this.onLearnMore(politicos)}
        />
      </View>
    );
  }

  onLearnMore = (politicos) => {
    this.props.navigation.navigate('Details', {...politicos});
  }

  listenFor(fRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase

    fRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          name: child.val().name,
          partido: child.val().partido,
          foto: child.val().foto,
          _key: child.key
        });
      });

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      });
    });
  }

  componentDidMount() {
    this.listenFor(this.state.fireRef);
  }

  render() {
    return (
			<View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        
        <StatusBar backgroundColor='black'/>
        <BarraNavegacao titulo='Políticos' corDeFundo='#004466' />

        <ListView
          dataSource={this.state.dataSource}
          //enableEmptySections={true}
          renderRow={this._renderItem.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderHeader={() => <Header />}
          renderFooter={() => <Footer />}
          style={styles.listView}
        />

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
  detalheVereador: {
    padding: 20,
    marginTop: 20
  },
  txtDetalheVereador: {
    fontSize: 18,
    marginLeft: 20
  },
  listView: {
    //flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
    width: "80%",
    marginLeft: "15%",
    marginRight: "5%",
  },
  icon:{
    width: 26,
    height: 26,
}
});
