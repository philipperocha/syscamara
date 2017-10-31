import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  ListView,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';
import { List, ListItem, SearchBar,  } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../src/data/firebase';
import customStyles from '../src/components/auxiliares/customStyles'

const uiTheme = {
  palette: {
    primaryColor: COLOR.grey800,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 70,
      paddingTop: 20,
    },
  },
};

export default class SessoesView extends Component {

  constructor(props, context) {
      super(props, context);
      
      let fireRef = firebase.database().ref('Sessoes');

      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });

      this.state = {
        active: 'Sessões',

        dataSource: dataSource, // dataSource for our list
        fireRef: fireRef,
      };
  }
  
  static navigationOptions = {
    title: 'Menu',
  };

  navigate() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  _renderItem(sessoes) {
    return (
      <TouchableNativeFeedback onPress={() => this.onLearnMore(sessoes)}  underlayColor="#D9D9D9">
          <View style={styles.containerPrincipal}>
              {/*<Image style={styles.sessoesImage} resizeMode='cover' source={{ uri: sessoes.foto }}/>*/}
              <View style={styles.containerPanel}>
                  <Text style={[customStyles.titulo, {marginHorizontal: 8}]}>{sessoes.titulo}</Text>
                  <Text style={[customStyles.descricao, {marginHorizontal: 8}]}>{sessoes.descricao}</Text>
                  <Text style={[customStyles.data, {marginHorizontal: 10, textAlign: 'right'}]}>{sessoes.data} </Text>
              </View>

          </View>
      </TouchableNativeFeedback>
    );
  }

  onLearnMore = (sessoes) => {
    this.props.navigation.navigate('DetalhesSessao', {...sessoes});
  }

  listenFor(fRef) {
    fRef.on('value', (dataSnapshot) => {
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          titulo: child.val().titulo,
          descricao: child.val().descricao,
          foto: child.val().foto,
          data: child.val().data,
          _key: child.key
        });
      });

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
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar
            leftElement="menu"
            centerElement={this.state.active}
            onLeftElementPress={() => this.navigate()}
          />
          <View style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              renderRow={this._renderItem.bind(this)}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
              style={styles.listView}
            />
          </View>
        </Container>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#455A64',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


  //migrou daqui

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

  containerPrincipal: {
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
});
