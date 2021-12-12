<template>
    <router-link :to="`/movie/${IMDbId}`">
        <div v-if="loaded" class="card" style="width: 15vw;">
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
        // eslint-disable-next-line no-console
        console.log(`https://localhost:7112/api/Movies/${this.IMDbId}`);

        axios.request(`https://localhost:7112/api/Movies/${this.IMDbId}`)
           .then(req => {
               this.title = req.data.title;
               this.src = req.data.poster;
               this.loaded = true;
           });
    } 
}
</script>
