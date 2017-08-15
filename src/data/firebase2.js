import * as firebase from 'firebase'

const configurationOptions = {
        apiKey: "AIzaSyAoACV4fA2Q_47VEKBXu3UrQVdM_Ik_IOI",
        authDomain: "my-app-5c471.firebaseapp.com",
        databaseURL: "https://my-app-5c471.firebaseio.com",
        projectId: "my-app-5c471",
        storageBucket: "my-app-5c471.appspot.com",
        messagingSenderId: "566860187383"
};

const FirebaseApp = firebase.initializeApp(configurationOptions);

export default FirebaseApp;