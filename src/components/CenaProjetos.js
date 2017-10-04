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
  TouchableNativeFeedback
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../data/firebase';

export default class CenaProjetos extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Projetos',
        tabBarIcon: ({tintColor}) => (
            <Icon name="pencil-square-o" size={22} color={tintColor} />
        )
  }

  constructor(props) {
    super(props);

    let fireRef = firebase.database().ref('Projetos');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource, // dataSource for our list
      fireRef: fireRef,
    };
  }

  _renderItem(projeto) {
    return (
      <TouchableNativeFeedback onPress={() => this.onLearnMore(projeto)}  underlayColor="#D9D9D9">
          <View style={styles.container}>
              {/*<Image style={styles.sessoesImage} resizeMode='cover' source={{ uri: sessoes.foto }}/>*/}
              <View style={styles.containerPanel}>
                  <Text style={styles.title} numberOfLines={2}>{projeto.codigo + ": " + projeto.titulo}</Text>
                  <Text style={styles.politicoPartido}>{projeto.politico + ' - ' + projeto.partido}</Text>
                  <Text style={styles.subtitle} numberOfLines={2}>{projeto.descricao}</Text>
              </View>

          </View>
      </TouchableNativeFeedback>
    );
  }

  onLearnMore = (projeto) => {
    this.props.navigation.navigate('Details', {...projeto});
  }

    listenFor(fRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase

    fRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          codigo: child.val().codigo,
          titulo: child.val().titulo,
          descricao: child.val().descricao,
          fotoPolitico: child.val().fotoPolitico,
          partido: child.val().partido,
          politico: child.val().politico,
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
              enableEmptySections={true}
              renderRow={this._renderItem.bind(this)}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
  detalhePautas: {
    marginTop: 20,
    padding: 10
  },
  txtPautas: {
    fontSize: 18
  },


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
        backgroundColor: '#848484',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'stretch',
        height: 34,
        width: 240,
        borderRadius: 1,
        margin: 6,
  },

  gridPautas:{
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  icon:{
    width: 26,
    height: 26,
},
 separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
    width: "100%",
    marginLeft: "0%",
    marginRight: "0%",
  },
  listView:{
    marginTop: 20
  },

  container: {
        flex: 1, 
        flexDirection: 'row', 
        padding: 0,
        marginTop: 4,
        marginBottom: 12
    },
        sessoesImage: {
        width: 80,
        height: 80,
        margin: 2,
        backgroundColor: 'gray'
    },
        containerPanel: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 0,
        
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 14,
        marginLeft: 8
    },
    politicoPartido: {
        fontSize: 14,
        marginLeft: 8,
        textAlign: 'center',
        fontStyle: 'italic',
        marginRight: 10,
        color: '#88592b',
    }

});
