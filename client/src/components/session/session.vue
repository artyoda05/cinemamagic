<template>
    <div class="container session-container">
        <div v-if="loaded" class="row">
            <div class="col-8">
                <seats-table :seats="seats"></seats-table>
            </div>
            <div class="col">
                <h3>{{ title }}</h3>
                <h5>{{ time }}</h5>
                <button type="button" class="btn btn-primary mt-3" v-on:click="buyTickets" >Buy tickets</button>
                <div v-if="this.$store.state.chosenSeats.length == 0" class="alert alert-warning mt-2" role="alert">
                    Choose seats first!
                </div>
                <reservation-modal v-if="(clicked && this.$store.state.chosenSeats.length != 0) || reserved" @reserved="reserved = true" @close="clicked = false" :title="title" :time="time" />
            </div>
        </div>
    </div>
</template>

<script>
import seatsTable from './seatsTable'
import reservation from './reservation'
import axios from 'axios'

export default {
    name: 'session',
    components: {
        'seats-table': seatsTable,
        'reservation-modal': reservation
    },
    data () {
        return {
            seats: false,
            title: false,
            time: false,
            loaded: false,
            clicked: false,
            reserved: false
        }
    },
    created () {
        this.$store.dispatch('retrieveSession', this.$route.params.id)
            .then(data => { 
                this.seats = data.seats;
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric'};
                this.time = new Intl.DateTimeFormat('en-GB', options).format(data.time);
                return axios.request(`https://localhost:7112/api/Movies/${data.IMDbId}`);
            })
            .then(res => {
                this.title = res.data.title;
                this.loaded = true;
            });
    },
    methods: {
        buyTickets() {
            this.clicked = this.$store.state.chosenSeats.length !== 0;
        }
    }
}
</script>

<style>
    .session-container, button {
        margin-top: 50px;
    }
</style>
