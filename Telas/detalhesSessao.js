import React, { Component } from 'react';
import { Image, View, StyleSheet, Text ,ScrollView, Linking, TouchableHighlight, ListView, StatusBar } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../src/data/firebase';

import customStyles from '../src/components/auxiliares/customStyles'

class DetalheSessao extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: <Text style={[customStyles.bottomBarTitle, {textAlign: 'center', marginBottom: 4, marginTop: -8}]}>Sessões</Text>,
        tabBarIcon: ({tintColor}) => (
            <Icon name="university" size={20} color={tintColor} />
        )
  }

  constructor(props) {
    super(props);

    const keySessao = this.props.navigation.state.params._key;
    let fireRef = firebase.database().ref('sessaos/' + keySessao + '/downloads');
    let mesaRef = firebase.database().ref('sessaos/' + keySessao + '/mesaDiretora');
    let presentesRef = firebase.database().ref('sessaos/' + keySessao + '/presentes');
    let materiasRef = firebase.database().ref('sessaos/' + keySessao + '/materias');

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource, // dataSource for our list
      dataSourceMesa: dataSource,
      dataSourcePresentes: dataSource,
      dataSourceMaterias: dataSource,
      fireRef: fireRef,
      mesaRef: mesaRef,
      presentesRef: presentesRef,
      materiasRef: materiasRef,
      totalPresentes: 0
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
              <View style={styles.dataDownload}>
                    <Text style={[customStyles.renderItemTitle, {marginBottom: 2}]} numberOfLines={2}>{arquivo.titulo}</Text>
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

  _renderItemMesa(arquivo) {
    const foto = arquivo.foto;
    return (
          <View style={styles.mesaContainer}>
              <View style={styles.fotoProfileMesa}>
                  <Image style={styles.profilePic} source={{uri: foto}}/>
              </View>

              <View style={styles.dadosProfileMesa}>
                  <Text style={customStyles.renderItemTitle}> {arquivo.name}</Text>
                  <Text style={customStyles.descricao}> {arquivo.funcao} - {arquivo.partido}</Text>
              </View>
          </View>
    );
  }

   _renderItemPresentes(arquivo) {
    return (
          <View>
              <View style={{flexDirection: 'row', height: 32, marginLeft: 10}}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={customStyles.descricaoItalic}>{arquivo.name} - </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={customStyles.descricaoItalic}>{arquivo.partido}</Text>
                </View>
              </View>
          </View>
    );
  }

  _renderItemMaterias(arquivo) {
    return (
        <View style={{marginLeft: 10, marginTop: 20, marginBottom: 12, marginRight: 8}}>
            <Text style={customStyles.renderItemTitle}>{arquivo.titulo}: {arquivo.descricao}</Text>
            <Text style={[customStyles.descricaoItalic]}>Autor: {arquivo.autor}</Text>
        </View>
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

  listenForMesa(fRef) {

    fRef.on('value', (dataSnapshot) => {
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          foto: child.val().foto,
          name: child.val().name,
          partido: child.val().partido,
          funcao: child.val().funcao,
          _key: child.key
        });
      });

      this.setState({
        dataSourceMesa: this.state.dataSourceMesa.cloneWithRows(data),
      });
    });
  }

  listenForPresentes(fRef) {

    fRef.on('value', (dataSnapshot) => {
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          name: child.val().name,
          partido: child.val().partido,
          _key: child.key
        });
      });

      this.setState({
        dataSourcePresentes: this.state.dataSourcePresentes.cloneWithRows(data),
        totalPresentes: data.length
      });
    });
  }

  listenForMaterias(fRef) {

    fRef.on('value', (dataSnapshot) => {
      var data = [];
      dataSnapshot.forEach((child) => {
        data.push({
          titulo: child.val().titulo,
          descricao: child.val().descricao,
          autor: child.val().autor,
          _key: child.key
        });
      });

      this.setState({
        dataSourceMaterias: this.state.dataSourceMaterias.cloneWithRows(data),
      });
    });
  }

  componentDidMount() {
    this.listenForMesa(this.state.mesaRef);
    this.listenForPresentes(this.state.presentesRef);
    this.listenForMaterias(this.state.materiasRef);
    this.listenFor(this.state.fireRef);
  }

  render() {
    const { titulo, foto, descricao, data, _key } = this.props.navigation.state.params;

    return (

        <View style={{flex: 1}}>
        <StatusBar backgroundColor="black" translucent />

      <ScrollView style={{paddingLeft: 0}}>
        <View style={styles.container}>

            <View style={styles.containerPanel}>
                <Text style={[customStyles.titulo, {textAlign: 'center', marginTop: 4}]}>{titulo}</Text>
                <Text style={[customStyles.descricao, {textAlign: 'center', marginBottom: 8}]}>{descricao}</Text>
                <Text style={[customStyles.data, {textAlign: 'center', marginBottom: 4}]}>{data}</Text>
            </View>

            <View style={styles.mesaDiretora}>
                <View style={{backgroundColor: '#f2f2f2', borderWidth: 0.5, height: 50, justifyContent: 'center', borderLeftWidth: 0, borderRightWidth: 0}}>
                    <Text style={[customStyles.titulo ,{textAlign: 'center'}]}>Mesa Diretora</Text>
                </View>
                <ListView
                  dataSource={this.state.dataSourceMesa}
                  enableEmptySections={true}
                  renderRow={this._renderItemMesa.bind(this)}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  style={styles.listView}
                />
            </View>

          <View style={styles.mesaDiretora}>
                <View style={{backgroundColor: '#f2f2f2', borderWidth: 0.5, height: 50, justifyContent: 'center', borderLeftWidth: 0, borderRightWidth: 0}}>
                    <Text style={[customStyles.titulo ,{textAlign: 'center'}]}>Presentes</Text>
                </View>
                <ListView
                  dataSource={this.state.dataSourcePresentes}
                  enableEmptySections={true}
                  renderRow={this._renderItemPresentes.bind(this)}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={[styles.separator, {width: "96%", marginLeft: "1%", marginRight: "3%"}] } />}
                  style={styles.listView}
                />

              <View style={{backgroundColor: '#e6e6e6', borderWidth: 0.5, borderColor: 'transparent', borderBottomColor: '#262626'}}>
                  <View style={{flexDirection: 'row', height: 36, marginLeft: 10, marginRight: 16, justifyContent: 'flex-end'}}>
                        <View style={{justifyContent: 'center'}}>
                              <Text style={customStyles.descricao}> Total de presentes: </Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                              <Text style={[customStyles.descricao, {textAlign: 'right'}]}>{this.state.totalPresentes}</Text>
                        </View>
                  </View>
              </View>
          </View>


            <View style={styles.mesaDiretora}>
                <View style={{backgroundColor: '#f2f2f2', borderWidth: 0.5, height: 50, justifyContent: 'center', borderLeftWidth: 0, borderRightWidth: 0}}>
                    <Text style={[customStyles.titulo ,{textAlign: 'center'}]}>Matérias</Text>
                </View>
                <ListView
                  dataSource={this.state.dataSourceMaterias}
                  enableEmptySections={true}
                  renderRow={this._renderItemMaterias.bind(this)}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  style={styles.listView}
                />
            </View>

            <View style={styles.mesaDiretora}>
                <View style={{backgroundColor: '#f2f2f2', borderWidth: 0.5, height: 50, justifyContent: 'center', borderLeftWidth: 0, borderRightWidth: 0}}>
                    <Text style={[customStyles.titulo, {textAlign: 'center'}]}>Arquivos</Text>
                </View>
                <ListView
                  dataSource={this.state.dataSource}
                  enableEmptySections={true}
                  renderRow={this._renderItem.bind(this)}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                  style={styles.listView}
                />
            </View>

        </View>

      </ScrollView>
      </View>
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
  mesaDiretora:{
    marginTop: 24,
    //backgroundColor: '#F2F2F2',
  },
    title: {
        fontSize: 14,
        //fontStyle: 'italic',
        //fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    descricao: {
        fontSize: 14,
        marginLeft: 8,
        textAlign: 'center'
    },
    data: {
        fontSize: 14,
        color: '#88592b',
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
    //backgroundColor: 
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 12,
    marginBottom: 6,
  },
  dataDownload:{
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    
  },
  fileDate: {
      flex: 1,
      color: '#88592b',
      fontSize: 14,
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
      marginRight: 12,
      marginBottom: 0,
  },
  btnText: {
      fontSize: 14,
      color: 'white',
      marginLeft: 30,
      marginTop: 0,
  },
  listView: {
    backgroundColor: '#e6e6e6',
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

  mesaContainer:{
    flex: 1,
    flexDirection: 'row',
  },
  fotoProfileMesa:{
    marginLeft: 10,
    marginRight: 6,
    marginVertical: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#4d4d4d',
  },
  dadosProfileMesa:{
    marginVertical: 8,
    justifyContent: 'center'
  },

  profilePic: {
    flex: 1,
    width: 60,
    height: 70, 
    alignSelf: 'stretch',

  },

});

export default DetalheSessao;
