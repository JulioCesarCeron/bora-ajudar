import Rebase from 're-base'
import firebase from 'firebase'


// Initialize Firebase
const config = {
    apiKey: 'AIzaSyAVyCdY6XU8jsGMoIUXYvv5QrfZEaX1zA8',
    authDomain: 'bora-judar-7ba7f.firebaseapp.com',
    databaseURL: 'https://bora-judar-7ba7f.firebaseio.com',
    projectId: 'bora-judar-7ba7f',
    storageBucket: '',
    messagingSenderId: '1015686560085'
  }
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export const auth = firebase.auth()
export default base