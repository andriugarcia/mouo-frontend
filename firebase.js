import firebase from 'firebase/app'
require('firebase/firestore')
require('firebase/auth')
require('firebase/storage')

const config = {
  apiKey: 'AIzaSyA8WTEbA59eCqU_0fv2jL7FdTinNGLGBvA',
  authDomain: 'mouo-app.firebaseapp.com',
  databaseURL: 'https://mouo-app.firebaseio.com',
  projectId: 'mouo-app',
  storageBucket: 'mouo-app.appspot.com',
  messagingSenderId: '52570323093'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
