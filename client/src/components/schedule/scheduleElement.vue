<template>
    <div class="container-fluid">
      <hr>
      <div v-if="loaded" class="row">
        <div class="col-3">
          <img class="schedule-image" :src="src">
        </div>
        <div class="col">
          <router-link :to="`movie/${movie.IMDbId}`"><h4>{{ name }}</h4></router-link>
          <date-element v-for="date in dates" v-bind:key="date.date.toString()" :date="`${date.date}`" :sessions="date.sessions"></date-element>    
        </div>
      </div>
      <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<script>
import DateElement from './dateElement'
import axios from 'axios' 

export default {
    name: 'schedule-element',
    components: {
      DateElement
    },
    props: {
      movie: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
          loaded: false,
          name: '',
          src: '',
          dates: []
      }
    },
    created () {
      // eslint-disable-next-line no-console
      console.log(this.movie);

      axios.request(`https://localhost:7112/api/Movies/${this.movie.IMDbId}`)
           .then(req => this.fillData(req.data));
    },  
    methods: {
      async fillData(data) {
        // eslint-disable-next-line no-console
        console.log(data);
        // eslint-disable-next-line no-console
        console.log(this.movie);

        this.dates = await this.$store.dispatch('retrieveSessionsByIMDbId', this.movie.IMDbId );
        this.name = data.title;
        this.src = data.poster;
        this.loaded = true;
      }
    }
}
</script>

<style>
  .schedule-image {
    width: 80%;
    height: auto;
  }
</style>
