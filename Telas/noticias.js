import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  ListView,
  Dimensions
} from 'react-native';
import {COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Container from '../Container';
import {List, ListItem, SearchBar,  } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewMoreText from 'react-native-view-more-text';
import firebase from '../src/data/firebase';
import LikeButtonNews from '../src/components/auxiliares/LikeButtonNews';
import IconButton from '../src/components/auxiliares/IconButton';
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

export default class NoticiasView extends Component {

  constructor(props, context) {
    super(props, context);
    let fireRef = firebase.database().ref('Noticias');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    
    this.state = {
      active: 'Noticias',

      dataSource: dataSource, // dataSource for our list
      newVereador: "", // The name of the new task
      fireRef: fireRef,
      noticias: null
    };
  }
    
  static navigationOptions = {
    title: 'Menu',
  };

  navigate() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  _renderItem(noticias) {
    return (
      <View style={styles.containerPanel}>
          <Text style={[customStyles.data, {marginLeft: 8, marginTop: 4}]}>{noticias.data}</Text>
          <Image style={styles.noticiasImage} source={{ uri: noticias.foto }}/>
          
          <View style={styles.followBar}>
              <View style={styles.likeButton}>
                  <LikeButtonNews currentUser={firebase.auth().currentUser.uid} currentNoticia={noticias._key}/>
              </View>
          </View>

          <View style={{marginHorizontal: 8, marginBottom: 6}}>
              <Text style={[customStyles.titulo, {textAlign: 'center', marginBottom: 4, marginTop: 6}]}>{noticias.titulo}</Text>
              <ViewMoreText numberOfLines={3} renderViewMore={this.renderViewMore} renderViewLess={this.renderViewLess}>
                  <Text style={customStyles.descricao}>
                      {noticias.descricao}
                  </Text>
              </ViewMoreText>
          </View>
      </View>
    );
  }
      
  onLearnMore = (noticias) => {
    this.props.navigation.navigate('Details', {...noticias});
  }
      
  listenFor(fRef) {
    fRef.on('value', (dataSnapshot) => {
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          titulo: child.val().titulo,
          descricao: child.val().descricao,
          foto: child.val().foto,
          data: child.val().dataNoticia,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      });
    });
  }

  componentWillMount() {
    this.listenFor(this.state.fireRef);
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

  renderViewMore(onPress){
    return(
        <Text style={[customStyles.mostrarMais, {textAlign: 'right', marginRight: 10, marginTop: 8}]} 
          onPress={onPress}>Mostrar Mais</Text>
    )
  };

  renderViewLess(onPress){
    return(
        <Text style={[customStyles.mostrarMais, {textAlign: 'right', marginRight: 10, marginTop: 8}]} 
          onPress={onPress}>Mostrar Menos</Text>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.grey800
    //justifyContent: 'center',
    //alignItems: 'center',
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 10,
    //backgroundColor: '#8E8E8E',
    backgroundColor: 'transparent',
    width: "100%",
    marginLeft: "0%",
    marginRight: "0%",
  },
  icon:{
    width: 26,
    height: 26,
  },
  listView:{
    marginTop: 4
  },

    noticiasImage: {
        
        marginTop: 4,
        marginBottom: 4,
        flex: 1,
        width: null,
        height: 180,
        //margin: 2,
        backgroundColor: 'gray'
    },
    containerPanel: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 0,
        marginBottom: 1,
        marginTop: 0,

        borderBottomWidth: 10,
        borderRadius: 4,
        //borderBottomColor: 'transparent',
    },
    title: {
        marginHorizontal: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    },
    subtitle: {
        fontSize: 14,
    },
    date: {
        marginLeft: 8,
        fontSize: 14,
        fontStyle: 'italic',
        color: '#88592b',
    },
    showMore: {
        textAlign: 'right',
        marginRight: 10,
        fontSize: 14,
        fontStyle: 'italic',
        color: '#88592b',
    },

    followBar:{
        flex: 1,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        borderWidth: 0,
        height: 40,
        //justifyContent: 'center'
    },
    likeButton: {
        marginLeft: 20,
        flexDirection: 'row',
        //justifyContent: 'center',
        width: (Dimensions.get('window').width / 2)
    },
});
