import React, {Component} from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, ToolbarAndroid } from "react-native";
import { List, ListItem, SearchBar,  } from "react-native-elements";

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
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
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
                        title={`${item.name.first} ${item.name.last}`}
                        subtitle={item.email}
                        avatar={{ uri: item.picture.thumbnail }}
                        containerStyle={{ borderBottomWidth: 0 }}
                        
                    />
                    )}
                    keyExtractor={item => item.email}
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