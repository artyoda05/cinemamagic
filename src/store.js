import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);
/* eslint-disable no-console */
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
const sessionCollection = db.collection('sessions');

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

function timestampToDate(timestamp) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(timestamp + 10800);
    return t;
}

function filterSessions (sessions) {
  let data = [];
  sessions.forEach(session => {
    let localData = {
      time : session.data().time,
      reference : session.data().reference
    };
    localData.time = timestampToDate(localData.time.seconds);
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
}

export const store = new Vuex.Store({
    state: {
        chosenSeats: []
    },
    mutations: {
      addSeat(state, seat) {
        state.chosenSeats.push(seat);
      },
      removeSeat(state, seat) {
        state.chosenSeats = state.chosenSeats.filter(x => x.seat != seat.seat || x.row != seat.row);
      },
      clearSeats(state) {
        state.chosenSeats = [];
      }
    },
    actions: {
      async retrieveMovies () {
        const docs = await moviesCollection.get();
        let data = []; 
        docs.forEach(doc => { 
          data.push({
            IMDbId: doc.data().IMDbId,
            sessions: doc.ref.collection('sessions').get()
                        .then(sessions => {return filterSessions(sessions)})
          })
        });
        return data;
      },
      async retrieveMoviesId() {
        const docs = await moviesCollection.get();
        let data = [];
        docs.forEach(doc => data.push(doc.data().IMDbId));
        return data;
      },
      async retrieveSessionsByIMDbId (state, IMDbId) {
        const docs = await moviesCollection.where("IMDbId", "==", IMDbId).limit(1).get();
        const doc = docs.docs[0];
        return doc.ref.collection('sessions').get()
          .then(sessions => { return filterSessions(sessions) })
      },
      async retrieveSession(state, sessionId) {
        const session = sessionCollection.doc(sessionId);
        let data = await session.get();
        data = data.data();
        const rows = await session.collection('seats').get();
        let seats = [];
        rows.forEach(row => seats.push({
          data: row.data().row,
          row: Number(row.id)
        }));
        return {
          time: timestampToDate(data.time.seconds),
          IMDbId: data.IMDbId,
          seats: seats.sort((a, b) => a.row > b.row).map(x => x.data)
        }
      }
    }  
});