import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

// Set the configuration for your app
const config = {
  apiKey: "AIzaSyDtSbo7fXwn0dM8z7nHgDf9-8BDUw31-kY",
  authDomain: "cinemamagic-a6f82.firebaseapp.com",
  databaseURL: "https://cinemamagic-a6f82.firebaseio.com",
  projectId: "cinemamagic-a6f82",
  storageBucket: "cinemamagic-a6f82.appspot.com",
  messagingSenderId: "1045165221737",
  appId: "1:1045165221737:web:e17f8b4e51ba98ad"
}
firebase.initializeApp(config)
const db = firebase.firestore()

/*eslint-disable no-console */
  db.collection("movies").limit(1).get().then(function(docs) {
    docs.forEach((doc) => {
      console.log(doc.data());
  });

}).catch(function(error) {
    console.log("Error getting document:", error);
});


export const store = new Vuex.Store({
    state: {
        
    },
    getters: {
        
    }
})