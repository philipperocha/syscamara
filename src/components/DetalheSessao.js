import React, { Component } from 'react';
import { Image, View, StyleSheet, Text ,ScrollView, Linking, TouchableHighlight, ListView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../data/firebase';

class DetalheSessao extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Sessões',
        tabBarIcon: ({tintColor}) => (
            <Icon name="university" size={20} color={tintColor} />
        )
  }

  constructor(props) {
    super(props);

    const keySessao = this.props.navigation.state.params._key;
    let fireRef = firebase.database().ref('Sessoes/' + keySessao + '/downloads');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource, // dataSource for our list
      fireRef: fireRef,
    };
  }

  _downloadFile(arquivo){
    const url = arquivo.link;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _renderItem(arquivo) {
    return (
      // <TouchableNativeFeedback onPress={() => this.onLearnMore(sessoes)}  underlayColor="#D9D9D9">
          <View style={styles.tituloArquivos}>
              <View>
                  <Text style={[styles.title, {textAlign: 'left'}]} numberOfLines={2}>{arquivo.titulo}</Text>
              </View>

              <View style={styles.dataDownload}>
                    <Text style={styles.fileDate} numberOfLines={2}>{arquivo.data}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <TouchableHighlight onPress={() => this._downloadFile(arquivo)} style={styles.button} >
                            <View style={{alignSelf: 'center', alignItems: 'center', marginVertical: -4}}>
                              <Icon
                                  name='download'
                                  size={18}
                                  color='white'
                                  style={styles.btnIcon}>
                                  <Text style={styles.btnText}> Download</Text>
                              </Icon>
                          </View> 
                      </TouchableHighlight>
                    </View>
              </View>
          </View>

      // </TouchableNativeFeedback>
    );
  }

  listenFor(fRef) {

    fRef.on('value', (dataSnapshot) => {
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          titulo: child.val().titulo,
          link: child.val().link,
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
    const { titulo, foto, descricao, data, _key } = this.props.navigation.state.params;

    return (
      <ScrollView style={{paddingLeft: 0}}>
        <View style={styles.container}>

            <View style={styles.containerPanel}>
                <Text style={styles.title}>{titulo}</Text>
                <Text style={styles.descricao}>{descricao}</Text>
                <Text style={styles.data}>{data}</Text>
            </View>

            <View style={styles.downloads}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this._renderItem.bind(this)}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  style={styles.listView}
                />
            </View>

        </View>

        {/* <List>
          <ListItem
            title="Descrição"
            rightTitle={descricao}
            hideChevron
          />
        </List> */}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    padding: 0,
    marginTop: 4,
    marginBottom: 12
  },
  content: {
    //width: null,
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F2F2F2',
    borderWidth: 0.5,
  },
  downloads:{
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F2F2F2',
    borderWidth: 0.5,
  },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 8,
        textAlign: 'center'
    },
    descricao: {
        fontSize: 14,
        color: '#805500',
        marginLeft: 8,
        textAlign: 'center'
    },
    data: {
        fontSize: 12,
        //fontWeight: 'bold',
        marginLeft: 8,
        textAlign: 'center',
        fontStyle: 'italic',
        marginRight: 10,
        
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
  tituloArquivos:{
    flexDirection: 'column',
  },
  dataDownload:{
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  fileDate: {
      flex: 1,
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 8,
      textAlign: 'left',
      fontStyle: 'italic',
  },
  button:{
      height: 30,
      width: 100,
      backgroundColor: '#003566',
      paddingVertical: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 8,
      marginBottom: 0,
  },
  btnText: {
      fontSize: 14,
      color: 'white',
      marginLeft: 30,
      marginTop: 0,
  },
  listView: {

  },
  containerPanel: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 0,
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F2F2F2',
    borderWidth: 0.5,
        
  },

});

export default DetalheSessao;
