<template>
    <div class="container-fluid">
      <hr>
      <div v-if="loaded" class="row">
        <div class="col-3">
          <img class="schedule-image" :src="src">
        </div>
        <div class="col">
          <h4>{{ name }}</h4>
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
      axios.request(`http://www.omdbapi.com/?i=${this.movie.IMDbId}&apikey=38389047`)
           .then(req => this.fillData(req.data));
    },  
    methods: {
      async fillData(data) {
        this.dates = await this.movie.sessions;
        this.name = data.Title;
        this.src = data.Poster;
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
