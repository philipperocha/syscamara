import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  debug: false
};

const firebaseApp = RNFirebase.initializeApp(configurationOptions);

export default firebaseApp;