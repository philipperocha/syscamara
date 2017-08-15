import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  debug: false,
  persistence: true,
};

const Firebase = RNFirebase.initializeApp(configurationOptions);

export default Firebase;