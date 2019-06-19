import firebase from 'firebase'
import config from '@/config.js'

let app =  firebase.initializeApp(config);
let db = app.database();
export default db