<template>
    <div class="container movie-container">
    <div v-if="filmData && sessions">
      <div class="row">
        <div class="col-4"><img class="movie-poster" :src="filmData.Poster"></div>
        <div class="col">
          <h2>{{ filmData.Title }}</h2>
          <p><b>Release date:</b> {{filmData.Released}}</p>
          <p><b>Rated:</b> {{filmData.Rated}}</p>
          <p><b>Runtime:</b> {{filmData.Runtime}}</p>
          <p><b>Genre:</b> {{filmData.Genre}}</p>
          <p><b>Director:</b> {{filmData.Director}}</p>
          <p><b>Actors:</b> {{filmData.Actors}}</p>
          <p><b>Plot:</b></p>
          <p>{{filmData.Plot}}</p>
        </div>
      </div>
      <date-element v-for="session in sessions" v-bind:key="session.date.toString()" :date="`${session.date}`" :sessions="session.sessions"></date-element>
    </div>
         <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    
</template>

<script>
import axios from 'axios'
import DateElement from '../schedule/dateElement'

export default {
  
    name: 'Movie',
    components: {
      DateElement
    },
    data () {
      return {
        filmData: false,
        sessions: false
      }
    },
    created () {
      axios.request(`http://www.omdbapi.com/?i=${this.$route.params.id}&apikey=38389047&plot=full`)
          .then(res => this.filmData = res.data);
      this.$store.dispatch('retrieveSessionsByIMDbId', this.$route.params.id )
          .then(sessions => this.sessions = sessions)
    }
}
</script>

<style>
  .movie-container {
    margin-top: 20px;
  }

  .col p{
    margin-top: 20px;
  }

  .movie-poster {
    width: 90%;
  }

  .lds-ring {
  display: block;
  position: relative;
  margin: auto;
  margin-top: 100px;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #353c45;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #353c45 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
