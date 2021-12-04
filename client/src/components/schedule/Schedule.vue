<template>
    <div class="container schedule-container">
      <h2>Schedule</h2>
      <div v-if="loaded">
        <schedule-element v-for="movie in movies" v-bind:key="movie.IMDbId" :movie="movie"></schedule-element>
      </div>
      <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<script>
import scheduleElement from './scheduleElement'

export default {
    name: 'Schedule',
    components: {
      scheduleElement
    },
    data () {
      return {
        loaded : false,
        movies : []
      }
    },
    created () {
      this.$store.dispatch('retrieveMovies')
          .then(data => this.fillSchedule(data));
    },
    methods: {
      fillSchedule(movies) {
        this.loaded = true;
        this.movies = movies;
      }
    }
}
</script>

<style>
  .schedule-container {
    margin-top: 20px;
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
