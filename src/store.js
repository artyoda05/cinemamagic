import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

// Set the configuration for your app
const config = {
  apiKey: "AIzaSyDtSbo7fXwn0dM8z7nHgDf9-8BDUw31-kY",
  authDomain: "cinemamagic-a6f82.firebaseapp.com",
  databaseURL: "https://cinemamagic-a6f82.firebaseio.com",
  projectId: "cinemamagic-a6f82",
  storageBucket: "cinemamagic-a6f82.appspot.com",
  messagingSenderId: "1045165221737",
  appId: "1:1045165221737:web:e17f8b4e51ba98ad"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const moviesCollection = db.collection("movies");

/* eslint-disable no-console */
 /* .get().then(function(docs) {
    
    docs.forEach((doc) => {
      doc.ref.collection('sessions').get().then(x => {
        x.forEach(y => {
          console.log(y.data());
        })
      });
  });

}).catch(function(error) {
    console.log("Error getting document:", error);
});
*/

export const store = new Vuex.Store({
    state: {
        
    },
    getters: {
        
    },
    actions: {
      async retrieveMovies () {
        const docs = await moviesCollection.get();//.then(docs => {return docs.map(doc => doc.data())});
        let data = []; 
        docs.forEach(doc => { 
          data.push({
            IMDbId: doc.data().IMDbId,
            sessions: doc.ref.collection('sessions').get()
                                                    .then(sessions => {
                                                      let data = [];
                                                      sessions.forEach(session => {
                                                        let localData = {
                                                          time : session.data().time,
                                                          reference : session.data().reference
                                                        };
                                                        let t = new Date(1970, 0, 1);
                                                        t.setSeconds(localData.time.seconds + 10800);
                                                        localData.time = t;
                                                        const localDataDate = localData.time.toDateString();
                                                        let placed = false;
                                                        data.forEach(el => {
                                                          if (el.date === localDataDate) {
                                                            el.sessions.push(localData);
                                                            placed = true;
                                                          }
                                                        });
                                                        if (!placed)
                                                          data.push({
                                                            date : localDataDate,
                                                            sessions: [localData]
                                                          });
                                                      });
                                                      return data;
                                                  })
          })
        });
        return data;
      }
    }
});