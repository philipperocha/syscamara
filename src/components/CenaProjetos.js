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
  Modal,
  TouchableNativeFeedback
} from 'react-native';
import { Tile, List, ListItem, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../data/firebase';

import customStyles from './auxiliares/customStyles'

export default class CenaProjetos extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: <Text style={[customStyles.bottomBarTitle, {textAlign: 'center', marginBottom: 4, marginTop: -12}]}>Projetos</Text>,
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

      checkedResolucao: false,
      checkedEmenda: false,
      checkedPL: false,
      modalVisible: false,
      listaFiltro: [],
      data: null
    };
  }

  _renderItem(projeto) {
    return (
      <TouchableNativeFeedback onPress={() => this.onLearnMore(projeto)}  underlayColor="#D9D9D9">
          <View style={styles.container}>
              {/*<Image style={styles.sessoesImage} resizeMode='cover' source={{ uri: sessoes.foto }}/>*/}
              <View style={styles.containerPanel}>
                  <Text style={[customStyles.titulo, {marginLeft: 8}]} numberOfLines={2}>{projeto.codigo + ": " + projeto.titulo}</Text>
                  {/* <Text style={[customStyles.descricao, {marginLeft: 8, textAlign: 'center'}]}>{projeto.politico + ' - ' + projeto.partido}</Text> */}
                  <Text style={[customStyles.descricao, {marginLeft: 8}]} numberOfLines={2}>{projeto.descricao}</Text>
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
          tipo: child.val().tipo,
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  filtrar(valor){
        var newData =[];
        if (valor.length == 0){
            newData = this.state.data.filter(function(item){
                const itemData = item.tipo.toUpperCase();
                return itemData.indexOf('') > -1;
            })
        }else{
            for (var i=0; i<valor.length; i++){
                const tempData = this.state.data.filter(function(item){
                    const itemData = item.tipo.toUpperCase();
                    return itemData.indexOf(valor[i].toUpperCase()) > -1;
                })
                newData = newData.concat(tempData);
            }
        }
    
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
        })
  }

  render() {
    return (
			
        <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        
            <StatusBar backgroundColor='black'/>

            <View style={{flexDirection:'row', marginTop: 12, marginBottom: 8, marginHorizontal: 12}}>
              <TouchableHighlight style={[styles.filterButton, {flex: 1}]}
                                  underlayColor= "transparent"
                                  onPress={() => {}}>
                <Icon name={'search'} size={30} color={'transparent'} />
              </TouchableHighlight>
              <Text style={[customStyles.titulo,{flex: 9, textAlign: 'center'}]}>PROJETOS</Text>
              <TouchableHighlight style={[styles.filterButton, {flex: 1}]}
                                  underlayColor= "transparent"
                                  onPress={() => {
                                  this.setModalVisible(true)
                                  }}>
                <Icon name={'filter'} size={30} color={'green'} />
              </TouchableHighlight>
            </View>

            <ListView
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              renderRow={this._renderItem.bind(this)}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
              style={styles.listView}
            />

          <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {console.log("Modal has been closed.")}} >
              
            <View style={{marginVertical: 16}}>
                <Text style={[customStyles.titulo,{textAlign: 'center'}]}>FILTRAR PROJETOS</Text>

                <View style={{marginTop: 20}}>
                    <CheckBox title={'Projeto de Lei'} checked={this.state.checkedPL}
                      //textStyle={customStyles.titulo}
                      fontFamily={'Exo-ExtraLight'}
                      onPress={() => {
                        this.setState({checkedPL: !this.state.checkedPL});
                        if (!this.state.checkedPL)
                            this.state.listaFiltro.push('Projeto de Lei');
                        else{
                            var array = [];
                            for (var i=0; i<this.state.listaFiltro.length; i++){
                                if (this.state.listaFiltro[i] != 'Projeto de Lei')
                                    array.push(this.state.listaFiltro[i]);
                            }
                            this.setState({listaFiltro: array});
                        }
                      }} 
                    />
                    <CheckBox title={'Resolução'} checked={this.state.checkedResolucao}
                      fontFamily={'Exo-ExtraLight'}
                      onPress={() => {
                        this.setState({checkedResolucao: !this.state.checkedResolucao});
                        if (!this.state.checkedResolucao)
                            this.state.listaFiltro.push('Resolução');
                        else{
                            var array = [];
                            for (var i=0; i<this.state.listaFiltro.length; i++){
                                if (this.state.listaFiltro[i] != 'Resolução')
                                    array.push(this.state.listaFiltro[i]);
                            }
                            this.setState({listaFiltro: array});
                        }
                      }} 
                    />
                    <CheckBox title={'Emenda Constitucional'} checked={this.state.checkedEmenda}
                      fontFamily={'Exo-ExtraLight'}
                      onPress={() => {
                        this.setState({checkedEmenda: !this.state.checkedEmenda});
                        if (!this.state.checkedEmenda)
                            this.state.listaFiltro.push('Emenda Constitucional');
                        else{
                            var array = [];
                            for (var i=0; i<this.state.listaFiltro.length; i++){
                                if (this.state.listaFiltro[i] != "Emenda Constitucional")
                                  array.push(this.state.listaFiltro[i]);
                            }
                            this.setState({listaFiltro: array});
                        }
                      }} 
                    />

                    <View style={{alignItems: 'center'}}>
                        <TouchableHighlight style={[styles.button, {marginTop: 10, height: 40}]}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.filtrar(this.state.listaFiltro);
                                    }}>
                            <Text style={[customStyles.renderItemTitle, {color: 'white', textAlign: 'center'}]}>Voltar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
          </Modal>
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
        backgroundColor: '#00802b',
        borderWidth: 2,
        borderColor: '#00802b',
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'stretch',
        height: 34,
        width: 120,
        borderRadius: 4,
        margin: 6,
  },
  filterButton:{
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    //alignSelf: 'stretch',
    height: 34,
    width: 34,
    borderRadius: 1,
    margin: 0,
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
    marginTop: 0
  },

  container: {
        flex: 1, 
        flexDirection: 'row', 
        padding: 0,
        marginTop: 8,
        marginBottom: 24
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
    subtitle: {
        fontSize: 14,
        marginLeft: 8
    }

});
