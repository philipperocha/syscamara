import React, { Component } from 'react';
import { View, StatusBar, Image, Text, StyleSheet, FlatList, ActivityIndicator, AppRegistry, TextInput, ListView, ToolbarAndroid,} from 'react-native';
import { List, ListItem, Separator, SearchBar,  } from "react-native-elements";
import FloatingActionButton from 'react-native-action-button';
import BarraNavegacao from './BarraNavegacao';
import * as firebase from 'firebase';
import Header from './auxiliares/Header';
import Footer from './auxiliares/Footer';

const detalheVereadores = require('../img/detalhe_vereadores.png');

// const firebaseConfig = {
//   apiKey: "AIzaSyAoACV4fA2Q_47VEKBXu3UrQVdM_Ik_IOI",
//   authDomain: "my-app-5c471.firebaseio.com",
//   databaseURL: "https://my-app-5c471.firebaseio.com/",
//   storageBucket: "",
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class CenaVereadores extends Component {


  constructor(props) {
    super(props);

    console.log(firebase.database().ref());

    this.tasksRef = firebase.database().ref();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource, // dataSource for our list
      newVereador: "", // The name of the new task
    };
  }

  _renderItem(task) {
    return (
      <View>
        <ListItem
            roundAvatar
            title={task.name}
            subtitle={task.partido}
            avatar={task.foto}
            containerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
    );
  }

  listenForTasks(tasksRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase
    tasksRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          name: child.val().name,
          partido: child.val().partido,
          foto: child.val().foto,
          _key: child.key
        });
      });

      console.log(tasks);

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }

  componentDidMount() {
    this.listenForTasks(this.tasksRef);
  }

  render() {
    return (
			<View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <StatusBar 
          //hidden
          backgroundColor='#B9C941'
        />

        <BarraNavegacao voltar navigator={this.props.navigator} corDeFundo='black' />

        <View style={styles.cabecalho}>
          <Image source={detalheVereadores} />
          <Text style={styles.txtTitulo}>Vereadores</Text>
        </View>

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
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
