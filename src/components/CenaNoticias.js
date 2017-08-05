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

const detalheNoticia = require('../img/detalhe_noticias.png');


const DATA = [
  {
    codigo: 1,
    nome: 'Vereador rouba 500.000',
    partido: 'Vereador é acusado de roubar 500.000 reais...',
    foto: 'http://cdn.wp-infinity.com/wp-content/uploads2/news-icon.png'
  }, {
   codigo: 2,
    nome: 'Vereador é pego em flagrante',
    partido: 'A polícia investiga vereador após caso...',
    foto: 'http://cdn.wp-infinity.com/wp-content/uploads2/news-icon.png'
  }, {
   codigo: 3,
    nome: 'Câmara passa por reformas',
    partido: 'Em dezembro a câmara passará por reformas...',
    foto: 'http://cdn.wp-infinity.com/wp-content/uploads2/news-icon.png'
  }, {
   codigo: 4,
    nome: 'Feriado em Lagarto',
    partido: 'Próxima sexte-feira será feriado em Lagarto...',
    foto: 'http://cdn.wp-infinity.com/wp-content/uploads2/news-icon.png'
  }, {
   codigo: 5,
    nome: 'Briga entre Vereadores',
    partido: 'Durante a sessão de quinta, dois vereadores...',
    foto: 'http://cdn.wp-infinity.com/wp-content/uploads2/news-icon.png'
  }, {
   codigo: 6,
    nome: 'Gabriel ganha eleições',
    partido: 'O vereador Gabriel ganha as eleições de...',
    foto: 'http://cdn.wp-infinity.com/wp-content/uploads2/news-icon.png'
  }
];


export default class CenaNoticias extends Component {

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
          backgroundColor='#EC7148'
        />

        <BarraNavegacao voltar navigator={this.props.navigator} corDeFundo='black' />

        <View style={styles.cabecalho}>
          <Image source={detalheNoticia} />
          <Text style={styles.txtTitulo}>Notícias</Text>
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

        {/*<View style={styles.detalheEmpresa}>
          <Text style={styles.txtEmpresa}>
            Aguardando o administrador cadastrar novas notícias...
          </Text>
        </View>*/}

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
  detalheNoticias: {
    marginTop: 20,
    padding: 10
  },
  txtNoticias: {
    fontSize: 18
  }
});
