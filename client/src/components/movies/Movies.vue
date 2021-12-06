<template>
    <div class="container movies-container">
      <h2>Movies</h2>
      <div v-if="loaded" class="card-deck">
        <movie-card v-for="id in ids" v-bind:key="id" :IMDbId="id"></movie-card>
      </div>
      <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<script>
import MovieCard from './movieCard'

export default {
    name: 'Movies',
    components: {
      MovieCard
    },
    data () {
      return {
        loaded: false,
        ids: []
      }
    },
    created () {
      this.$store.dispatch('retrieveMoviesId')
          .then(data => {
            this.ids = data;
            this.loaded = true;
          });
    }
}
</script>

<style>
  .movies-container {
    margin-top: 20px;
  }

  .movies-container h2 {
    margin-bottom: 20px;
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