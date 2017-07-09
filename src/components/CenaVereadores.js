import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  StyleSheet,
  FlatList, 
  ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar,  } from "react-native-elements";

//importar o componente barra navegação
import BarraNavegacao from './BarraNavegacao';

const detalheVereadores = require('../img/detalhe_vereadores.png');


const DATA = [
  {
    codigo: 1,
    nome: 'Alex Dentinho',
    partido: 'PRB',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/27_foto_parlamentar'
  }, {
   codigo: 2,
    nome: 'Baiano Treze',
    partido: 'PSB',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/1_foto_parlamentar'
  }, {
   codigo: 3,
    nome: 'Eduardo de João Maratá',
    partido: 'PR',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/28_foto_parlamentar'
  }, {
   codigo: 4,
    nome: 'Itamar de Santana',
    partido: 'PPS',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/38_foto_parlamentar'
  }, {
   codigo: 5,
    nome: 'Creusa Maria dos Santos',
    partido: 'PPS',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/30_foto_parlamentar'
  }, {
   codigo: 6,
    nome: 'Gilberto da Farinha',
    partido: 'DEM',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/18_foto_parlamentar'
  }, {
   codigo: 7,
    nome: 'Jailton da Mercearia',
    partido: 'PRP',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/32_foto_parlamentar'
  },{
   codigo: 8,
    nome: 'Zé do Perfume',
    partido: 'PSC',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/33_foto_parlamentar'
  },{
   codigo: 9,
    nome: 'Marta da Dengue',
    partido: 'PMDB',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/23_foto_parlamentar'
  },{
   codigo: 10,
    nome: 'Gordinho da Laranja',
    partido: 'PRP',
    foto: 'http://sapl.lagarto.se.leg.br/sapl_documentos/parlamentar/fotos/37_foto_parlamentar'
  }
];

export default class CenaVereadores extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=2`;
    this.setState({ loading: true });
    
    fetch(url)
    .then(res => res.json())
    .then(res => {

        this.setState({
          data: DATA,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

    renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

    renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };


  render() {
    return (
			<View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <StatusBar 
          //hidden
          backgroundColor='#B9C941'
        />

        {/*<BarraNavegacao voltar navigator={this.props.navigator} corDeFundo='#B9C941' />*/}
        <BarraNavegacao voltar navigator={this.props.navigator} corDeFundo='black' />

        <View style={styles.cabecalho}>
          <Image source={detalheVereadores} />
          <Text style={styles.txtTitulo}>Vereadores</Text>
        </View>

        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                
          <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
              <ListItem
                  roundAvatar
                  title={item.nome}
                  subtitle={item.partido}
                  avatar={item.foto}
                  containerStyle={{ borderBottomWidth: 0 }}
                  
              />
              )}
              keyExtractor={item => item.codigo}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
          />
        </List>

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
  }
});
