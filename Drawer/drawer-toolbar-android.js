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
        active: 'people',
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
                    centerElement="Menu"
                />
                    <View style={styles.container}>
                        <Drawer>
                            {/* <Drawer.Header >
                                <Drawer.Header.Account
                                style={{ 
                                    container: { backgroundColor: '#fafafa' },
                                }}
                                avatar={<Avatar text={'K'} />}
                                accounts={[
                                    { avatar: <Avatar text="H" /> },
                                    { avatar: <Avatar text="L" /> },
                                ]}
                                footer={{
                                    dense: true,
                                    centerElement: {
                                        primaryText: 'Kevin Le',
                                        secondaryText: 'kevin@codeprototype.com',
                                    },
                                    rightElement: 'arrow-drop-down',
                                  }}
                            />
                            </Drawer.Header> */}
                            <Drawer.Section
                            style={{
                                label: {color: '#0000ff'}
                            }}
                            divider
                            items={[
                                {
                                    icon: 'bookmark-border', value: 'Home',
                                    active: this.state.active == 'home',
                                    onPress: () => {
                                        this.setState({ active: 'home' });
                                        this.props.navigation.navigate('Home');
                                      },
                                  },
                                {
                                    icon: 'today', value: 'Noticias',
                                    active: this.state.active == 'noticias',
                                    onPress: () => {
                                        this.setState({ active: 'noticias' });
                                        this.props.navigation.navigate('Noticias');
                                      },
                                  },
                                {
                                    icon: 'people', value: 'Politicos',
                                    active: this.state.active == 'politicos',
                                    onPress: () => {
                                        this.setState({ active: 'politicos' });
                                        this.props.navigation.navigate('Politicos');
                                      },
                                  },
                                  {
                                    icon: 'file-download', value: 'Sessoes',
                                    active: this.state.active == 'sessoes',
                                    onPress: () => {
                                        this.setState({ active: 'sessoes' });
                                        this.props.navigation.navigate('Sessoes');
                                      },
                                  },
                                  {
                                    icon: 'euro-symbol', value: 'Projetos',
                                    active: this.state.active == 'projetos',
                                    onPress: () => {
                                        this.setState({ active: 'projetos' });
                                        this.props.navigation.navigate('Projetos');
                                      },
                                  },
                            ]}
                        />
                            <Drawer.Section
                            title="Configurações"
                            items={[
                                {
                                    icon: 'settings', value: 'Perfil',
                                    active: this.state.active == 'perfil',
                                    onPress: () => {
                                        this.setState({ active: 'perfil' });

                                        //this.props.navigation.navigate('DrawerClose');
                                        this.props.navigation.navigate('Perfil');
                                      },
                                  },
                                // {
                                //     icon: 'info', value: 'Configurações',
                                //     active: this.state.active == 'settings',
                                //     onPress: () => {
                                //         this.setState({ active: 'settings' });
                                //         this.props.navigation.navigate('Settings');
                                //       },
                                //   },
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
