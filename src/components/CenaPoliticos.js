import React, { Component } from 'react';
import { View, StatusBar, Image, Text, StyleSheet, FlatList, ActivityIndicator, AppRegistry, TextInput, ListView, ToolbarAndroid,} from 'react-native';
import { List, ListItem, Separator, SearchBar, Avatar } from "react-native-elements";
import FloatingActionButton from 'react-native-action-button';
import BarraNavegacao from './auxiliares/BarraNavegacao';
import Header from './auxiliares/Header';
import Footer from './auxiliares/Footer';

import firebase from '../data/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

import customStyles from './auxiliares/customStyles'

export default class CenaPoliticos extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: <Text style={[customStyles.bottomBarTitle, {textAlign: 'center', marginBottom: 4, marginTop: -6}]}>Políticos</Text>,
        tabBarIcon: ({tintColor}) => (
          <Icon name="address-book-o" size={22} color={tintColor} />
        )
  }


  constructor(props) {
    super(props);

    let fireRef = firebase.database().ref('Politicos');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      data: null,
      dataSource: dataSource, // dataSource for our list
      newVereador: "", // The name of the new task
      fireRef: fireRef,
      text: ''
    };
  }

  _renderItem(politicos) {
    return (
      <View>
        <ListItem
            roundAvatar
            title={<Text style={[customStyles.renderItemTitle, {marginLeft: 24}]}>{politicos.name}</Text>}
            subtitle={<Text style={[customStyles.renderItemSubtitle,{marginLeft: 24, marginBottom: 8}]}>{politicos.partido}</Text>}
            avatar={<Avatar
                      medium
                      rounded
                      source={{uri: politicos.foto}}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={() => this.onLearnMore(politicos)}
            style={{marginVertical: 8, height: 54}}
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
          descricao: child.val().descricao,
          _key: child.key
        });
      });

      // Update the state with the new tasks
      this.setState({
        data: data,
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

        <View style={{marginTop: 20, marginHorizontal: 10, marginLeft: 20, flexDirection: 'row' }}>
          <Icon name="search" size={22} />
          <TextInput
            style={[customStyles.buscar, styles.textInput]}
            onChangeText={(text) => this.filterText(text)}
            value={this.state.text}
            underlineColorAndroid='transparent'
            placeholder='Buscar pelo nome do político'
            //placeholderStyle={{fontStyle: 'italic'}}
          />
        </View >

        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this._renderItem.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          style={styles.listView}
        />

      </View>
    );
  }

  filterText(text){
    const newData = this.state.data.filter(function(item){
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    })
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
    marginTop: 10
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bfbfbf',
    //width: "80%",
    marginLeft: 70,
    marginRight: 25
    //marginRight: "5%",
  },
  icon:{
    width: 26,
    height: 26,
  },
  textInput:{
    height: 30,
    width: "90%",
    //borderWidth: 0.5,
    marginLeft: 10,
    //borderColor: 'black',

  }
});
