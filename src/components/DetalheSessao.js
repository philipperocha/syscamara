import React, { Component } from 'react';
import { Image, View, StyleSheet, Text ,ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class DetalheNoticia extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Sessões',
        tabBarIcon: ({tintColor}) => (
            <Icon name="university" size={20} color={tintColor} />
        )
  }

  render() {
    const { titulo, foto, descricao } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 0 }}>
          <Tile
            imageSrc={{ uri: foto}}
            //featured
            //title={`${titulo.toUpperCase()}`}
            //caption={descricao}
            //contentContainerStyle={{height: 100}}
            width={200}
            height={260}
          >
          </Tile>
        </View>
        <View style={{alignItems: 'center', marginTop: 0, marginBottom: 0 }}>
          <View >
              <Text style={styles.title}>{titulo}</Text>
            </View>
           <View style={{alignItems: 'center', marginTop: 12, marginBottom: 0, marginLeft: 10 }}>
              <Text style={styles.descricao}>{descricao}</Text>
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
  title:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  descricao:{
    fontSize: 16,
  },
  icon:{
    width: 26,
    height: 26,
  }
});

export default DetalheNoticia;
