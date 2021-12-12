import Vue from 'vue';
import Vuex from 'vuex';
// import firebase from 'firebase';
import axious from 'axios';

/* eslint-disable no-console */


Vue.use(Vuex);

// // Set the configuration for your app
// const config = {
//   apiKey: "AIzaSyDtSbo7fXwn0dM8z7nHgDf9-8BDUw31-kY",
//   authDomain: "cinemamagic-a6f82.firebaseapp.com",
//   databaseURL: "https://cinemamagic-a6f82.firebaseio.com",
//   projectId: "cinemamagic-a6f82",
//   storageBucket: "cinemamagic-a6f82.appspot.com",
//   messagingSenderId: "1045165221737",
//   appId: "1:1045165221737:web:e17f8b4e51ba98ad"
// };
// firebase.initializeApp(config);
// const db = firebase.firestore();
// // const moviesCollection = db.collection("movies");
// // const sessionCollection = db.collection('sessions');
// // eslint-disable-next-line
// const sendMessage = firebase.functions().httpsCallable('sendMail');

function timestampToDate(timestamp) {
    return new Date(timestamp);
    
}

function filterSessions (sessions) {
  let data = [];

  console.log(sessions);

  sessions.forEach(session => {
    let localData = {
      time : session.dateTime,
      reference : session.id
    };

    console.log(session);

    localData.time = timestampToDate(localData.time);
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

function createSeats(numberOfSeats, row, occupiedSeats) {
  let res = [];

  for (let index = 0; index < numberOfSeats; index++) {
    res.push(!occupiedSeats.some(s => s.row === row && s.seat === index + 1));
  }

  return res;
}

export const store = new Vuex.Store({
    state: {
        chosenSeats: [],
        id: ''
    },
    mutations: {
      addSeat(state, seat) {
        state.chosenSeats.push(seat);
      },
      removeSeat(state, seat) {
        state.chosenSeats = state.chosenSeats.filter(x => x.seat != seat.seat || x.row != seat.row);
      }
    },
    actions: {
      async retrieveMovies () {
        const movies = await axious.get("https://localhost:7112/api/Movies");

        console.log(movies);

        return movies.data.map(movie => {
          return {
            IMDbId: movie.id,
            sessions: this.retrieveSessionsByIMDbId};
          });

        // const docs = await moviesCollection.get();
        // let data = []; 
        // docs.forEach(doc => { 
        //   data.push({
        //     IMDbId: doc.data().IMDbId,
        //     sessions: doc.ref.collection('sessions').get()
        //                 .then(sessions => {return filterSessions(sessions)})
        //   })
        // });
        // return data;
      },
      async retrieveMoviesId() {
        //const docs = await moviesCollection.get();

        const smth = await axious.get("https://localhost:7112/api/Movies");

        console.log(smth);

        let data = 
         smth.data.map(s => s.id);
        return data;
      },
      async retrieveSessionsByIMDbId (state, IMDbId) {
        const smth = await axious.get(`https://localhost:7112/api/Sessions/movie/${IMDbId}`);

        console.log(smth);

        return  filterSessions(smth.data);
        // const docs = await moviesCollection.where("IMDbId", "==", IMDbId).limit(1).get();
        // const doc = docs.docs[0];
        // return doc.ref.collection('sessions').get()
        //   .then(sessions => { return filterSessions(sessions) })
      },
      async retrieveSession(state, sessionId) {
        const session = await axious.get(`https://localhost:7112/api/Sessions/${sessionId}`);
        let data = await session.data;
        console.log(data);

        const occupied = await axious.get(`https://localhost:7112/api/Bookings/session/${sessionId}`);

        const occupiedSeats = occupied.data.flatMap(x => x.tickets);

        const rows = data.hall.rows;
        let seats = [];
        rows.forEach(row => seats.push({
          data: createSeats(row.numberOfSeats,row.rowNumber, occupiedSeats),
          row: row.rowNumber
        }));
        return {
          time: timestampToDate(data.dateTime),
          IMDbId: data.movie.id,
          seats: seats.sort((a, b) => a.row > b.row).map(x => x.data)
        }
      },
      async reserveSeats(state, data) {
        data.userId = this.state.id;

        console.log(data);

        await axious.post(`https://localhost:7112/api/Bookings`, data);

        return true;
      },
      async login(state, data) {
        const id = await axious.post(`https://localhost:7112/api/Users/login`, data);

        console.log(id.data);

        if (id.data){
          this.state.id = id.data;
          return true;
        }

        console.log(this.state.id);

        return false;
      },
      async register(state, data) {
        const id = await axious.post(`https://localhost:7112/api/Users/register`, data);

        console.log(id.data);

        if (id.data){
          this.state.id = id.data.id;
          return true;
        }

        console.log(this.state.id);

        return false;
      },
      async bookings() {
        const bookings = await axious.get(`https://localhost:7112/api/Bookings/user/${this.state.id}`);

        
        return bookings.data;
      },
      async cancelReservation(state, data) {
        await axious.delete(`https://localhost:7112/api/Bookings/${data.id}`);
      }
    }  
});
