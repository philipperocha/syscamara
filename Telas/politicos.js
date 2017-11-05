import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  TextInput, ListView, ToolbarAndroid
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';
import {List, ListItem, Separator, SearchBar, Avatar } from "react-native-elements";
import FloatingActionButton from 'react-native-action-button';
import firebase from '../src/data/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
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

export default class PoliticosView extends Component {

  static navigationOptions = {
    tabBarVisible: true,
    tabBarLabel: <Text style={[customStyles.bottomBarTitle, {textAlign: 'center', marginBottom: 4, marginTop: -6}]}>Políticos</Text>,
    tabBarIcon: ({tintColor}) => (
      <Icon name="address-book-o" size={22} color={tintColor} />
    )
  }

    constructor(props, context) {
        super(props, context);

        let fireRef = firebase.database().ref('Politicos');

        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
        
        this.state = {
          active: 'Politicos',

          data: null,
          dataSource: dataSource, // dataSource for our list
          newVereador: "", // The name of the new task
          fireRef: fireRef,
          text: ''
        };
    }
    
    static navigationOptions = {
      title: 'Menu',
    };

    navigate() {
        this.props.navigation.navigate('DrawerOpen'); // open drawer
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
      this.props.navigation.navigate('DetalhesPolitico', {...politicos});
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
  

  render() {
    return (

      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar
            leftElement="menu"
            centerElement={[<Text style={[customStyles.titulo,{color: 'white'}]}>{this.state.active}</Text>]}
            onLeftElementPress={() => this.navigate()}
          />
          
          
            <View style={styles.container}>
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
          
        </Container>
      </ThemeProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
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
    height: 37,
    width: "90%",
    //borderWidth: 0.5,
    marginLeft: 10,
    //borderColor: 'black',

  }

});
