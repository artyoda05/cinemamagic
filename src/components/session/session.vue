<template>
    <div class="container session-container">
        <div v-if="loaded" class="row">
            <div class="col-8">
                <seats-table :seats="seats"></seats-table>
            </div>
            <div class="col">
                <h3>{{ title }}</h3>
                <h5>{{ time }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
import seatsTable from './seatsTable'
import axios from 'axios'

export default {
    name: 'session',
    components: {
        seatsTable
    },
    data () {
        return {
            seats: false,
            title: false,
            time: false,
            loaded: false
        }
    },
    created () {
        this.$store.dispatch('retrieveSession', this.$route.params.id)
            .then(data => { 
                this.seats = data.seats;
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric'};
                this.time = new Intl.DateTimeFormat('en-GB', options).format(data.time);
                return axios.request(`http://www.omdbapi.com/?i=${data.IMDbId}&apikey=38389047`);
            })
            .then(res => {
                this.title = res.data.Title;
                this.loaded = true;
            });
    }
}
</script>

<style>
    .session-container{
        margin-top: 20px;
    }
</style>
