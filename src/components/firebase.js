import RNFirebase from 'react-native-firebase'

const firebaseApp = RNFirebase.initializeApp({
  debug: false
});

export default firebaseApp;