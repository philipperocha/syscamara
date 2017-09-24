import React, { Component } from 'react';
import { Image, View, StyleSheet, Text ,ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class DetalheNoticia extends Component {

  static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Noticias',
        tabBarIcon: ({tintColor}) => (
            <Icon name="newspaper-o" size={22} color={tintColor} />
        )
  }

  render() {
    const { titulo, foto, descricao, data } = this.props.navigation.state.params;

    return (
        <View style={styles.container}>
            <Image style={styles.newsImage} source={{ uri: foto }}/>
            <ScrollView automaticallyAdjustContentInsets={false} >
                <View style={styles.containerPanel}>
                    <Text style={styles.title}>{titulo}</Text>
                    <Text style={styles.content}>{descricao}</Text>
                    <Text style={styles.date}>{data}</Text>
                </View>
            </ScrollView>

        </View>
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
  },

      container: {
        flex: 1
    },
    newsImage: {
        backgroundColor: 'gray',
        flex: 1
    },
    containerPanel: {
        flex: 1,
        flexDirection: 'column',
        padding: 16
    },

    content: {
        fontSize: 18,
        paddingTop: 10
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#805500',
        paddingTop: 10
    }
});

export default DetalheNoticia;
