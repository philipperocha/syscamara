import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ListView,
  ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar,  } from "react-native-elements";
import Header from './auxiliares/Header';
import Footer from './auxiliares/Footer';

//importar o componente barra navegação
import BarraNavegacao from './auxiliares/BarraNavegacao';
import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from '../data/firebase';

export default class CenaNoticias extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Noticias',
        tabBarIcon: ({tintColor}) => (
           <Icon name="newspaper-o" size={22} color={tintColor} />
        )
  }

  constructor(props) {
    super(props);

    let fireRef = firebase.database().ref('Noticias');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource, // dataSource for our list
      newVereador: "", // The name of the new task
      fireRef: fireRef,
    };
  }

  _renderItem(noticias) {
    return (
      <View>
        <ListItem
            roundAvatar
            title={noticias.titulo}
            subtitle={noticias.descricao}
            avatar={noticias.foto}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={() => this.onLearnMore(noticias)}
        />
      </View>
    );
  }

  onLearnMore = (noticias) => {
    this.props.navigation.navigate('Details', {...noticias});
  }

  listenFor(fRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase

    fRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          titulo: child.val().titulo,
          descricao: child.val().descricao,
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
			<View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        
        <StatusBar backgroundColor='black'/>

        <ListView
          dataSource={this.state.dataSource}
          //enableEmptySections={true}
          renderRow={this._renderItem.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          //renderHeader={() => <Header />}
          //renderFooter={() => <Footer />}
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
  },
  listView:{
    marginTop: 20
  }
});
