import React, { Component } from 'react';
import { Image, View, StyleSheet, Text ,ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class DetalheSessao extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Sessões',
        tabBarIcon: ({tintColor}) => (
            <Icon name="university" size={20} color={tintColor} />
        )
  }

  render() {
    const { titulo, foto, descricao, data } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <View style={styles.container}>

            <View style={styles.content}>
                <Text style={styles.title}>{titulo}</Text>
                <Text style={styles.descricao}>{descricao}</Text>
                <Text style={styles.data}>{data}</Text>
            </View>

            <View style={styles.downloads}>
                
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
  container:{
    alignItems: 'center'
  },
  content: {
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
  title:{
    marginTop: 4,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  descricao:{
    fontSize: 16,
    textAlign: 'center'
  },
  data:{
    marginBottom: 4,
    color: '#805500',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  icon:{
    width: 26,
    height: 26,
  },

});

export default DetalheSessao;
