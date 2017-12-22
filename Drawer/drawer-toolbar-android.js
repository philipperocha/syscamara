import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View
} from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
import Container from '../Container';
import Icon from 'react-native-vector-icons/FontAwesome';
import customStyles from '../src/components/auxiliares/customStyles';

const uiTheme = {
    palette: {
        primaryColor: COLOR.grey800,
        accentColor: COLOR.pink500,
      },
    toolbar: {
        container: {
            height: 70,
            paddingTop: 20,
          },
      },
      avatar: {
          container: {
              backgroundColor: '#333'
          }
      }
  };

export default class DrawerMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        active: 'home',
      };
  }

  _setInfoActive() {
    this.setState({ active: 'info' });
  }

  render() {
    return (
        <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                    <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.navigate('DrawerClose')}
                />
                    <View style={styles.container}>
                        <Drawer>
                            <Drawer.Section
                            style={{
                                label: {color: '#0000ff'}
                            }}
                            divider
                            items={[
                                {
                                    key: '28664196-b3b1-41a3-ae19-1525829aa01f',
                                icon: 'home',
                                    value: <Text style={customStyles.descricao}>Home</Text>,
                                    active: this.state.active == 'home',
                                    onPress: () => {
                                        this.setState({ active: 'home' });
                                        this.props.navigation.navigate('Home');
                                      },
                                  },
                                {
                                    key: 'd729a113-fc6c-4e36-9aaa-78a3fc09c632',
                                icon: 'view-carousel', 
                                    value: <Text style={customStyles.descricao}>Notícias</Text>,
                                    active: this.state.active == 'noticias',
                                    onPress: () => {
                                        this.setState({ active: 'noticias' });
                                        this.props.navigation.navigate('Noticias');
                                      },
                                  },
                                {
                                    key: '3c4d8936-6a58-43ee-990a-3bbe506544cb',
                                    icon:'recent-actors',
                                    value: <Text style={customStyles.descricao}>Parlamentares</Text>,
                                    active: this.state.active == 'politicos',
                                    onPress: () => {
                                        this.setState({ active: 'politicos' });
                                        this.props.navigation.navigate('Politicos');
                                      },
                                  },
                                  {
                                    key: '6913fd68-6194-4737-931b-c44cb81ff115',
                                  icon: 'work',
                                    value: <Text style={customStyles.descricao}>Sessões</Text>,
                                    active: this.state.active == 'sessoes',
                                    onPress: () => {
                                        this.setState({ active: 'sessoes' });
                                        this.props.navigation.navigate('Sessoes');
                                      },
                                  },
                                  {
                                      key: '57dd7a97-49db-4aae-9fd0-468ed9cc63ed',
                                  icon: 'receipt',
                                    value: <Text style={customStyles.descricao}>Projetos</Text>,
                                    active: this.state.active == 'projetos',
                                    onPress: () => {
                                        this.setState({ active: 'projetos' });
                                        this.props.navigation.navigate('Projetos');
                                      },
                                  },
                            ]}
                        />
                            <Drawer.Section
                            title={'Configurações'}
                            items={[
                                {
                                    key: '15aa69bb-d51d-4033-ae6b-b3d0bf0afc5b',
                                    icon: 'perm-identity',
                                    value: <Text style={customStyles.descricao}>Perfil</Text>,
                                    active: this.state.active == 'perfil',
                                    onPress: () => {
                                        this.setState({ active: 'perfil' });

                                        this.props.navigation.navigate('Perfil');
                                      },
                                  },
                            ]}
                        />
                        </Drawer>
                    </View>
                </Container>
            </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
    header: {
        backgroundColor: '#455A64',
      },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
  });
