<template>
    <router-link :to="`/movie/${IMDbId}`">
        <div v-if="loaded" class="card">
            <img :src="src" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
            </div>
        </div>
        <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </router-link>
</template>

<script>
import axios from 'axios' 

export default {
    name: 'movie-card',
    props: {
        IMDbId: {
            type: String,
            required: true
        }
    },
    data() {
      return {
          loaded: false,
          title: '',
          src: ''
      }  
    },
    created() {
        axios.request(`http://www.omdbapi.com/?i=${this.IMDbId}&apikey=38389047`)
           .then(req => {
               this.title = req.data.Title;
               this.src = req.data.Poster;
               this.loaded = true;
           });
    } 
}
</script>
