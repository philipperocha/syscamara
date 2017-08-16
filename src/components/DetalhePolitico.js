import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class DetalhePolitico extends Component {

    static navigationOptions = {
        tabBarVisible: true,
        tabBarLabel: 'Politicos',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/bottomBar/politico.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
  }

  render() {
    const { foto, name, partido } = this.props.navigation.state.params;

    console.log(foto);

    return (
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 0 }}>
            <Tile
              imageSrc={{ uri: foto}}
              featured
              //title={`${name.toUpperCase()}`}
              //caption={partido}
              //contentContainerStyle={{height: 100}}
              width={200}
              height={260}
            >

            </Tile>
        </View>
        
          <List>
            <ListItem
              title="Nome"
              rightTitle={name}
              hideChevron
            />
            <ListItem
              title="Partido"
              rightTitle={partido}
              hideChevron
            />
            <ListItem
              title="Email"
              rightTitle="-----"
              hideChevron
            />
            <ListItem
              title="Mandato"
              rightTitle="-----"
              hideChevron
            />
            <ListItem
              title="Formação"
              rightTitle="-----"
              hideChevron
            />
          </List>
        

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon:{
    width: 26,
    height: 26,
}
});

export default DetalhePolitico;
