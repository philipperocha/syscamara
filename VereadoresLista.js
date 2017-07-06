import React, {Component} from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ToolbarAndroid } from "react-native";
import { List, ListItem, SearchBar,  } from "react-native-elements";



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
  }
];

export default class VereadoresLista extends Component {
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
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    setTimeout(2000, () => {
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
            <View >
                <ToolbarAndroid style={styles.toolbar} title="VEREADORES" titleColor="green"/>
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                    <ListItem
                        roundAvatar
                        title={item.nome}
                        subtitle={item.partido}
                        avatar={{ uri: item.foto }}
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
  toolbar:{
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 50,
        width: 360,
        backgroundColor: 'black',
        //color: 'white',
   },
     container: {
    top: 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});