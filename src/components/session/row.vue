<template>
    <div class="d-flex flex-row justify-content-center">
        <seat v-for="(seat, index) in seats" v-bind:key="index+1" :available="seat" :row="row" :seat="index+1"></seat>
    </div>
</template>

<script>
import Seat from './seat'

export default {
    name: 'row',
    components: {
        Seat
    },
    props: {
        row: {
            type: Number,
            required: true
        },
        seats: {
            type: Array,
            required: true
        }
    }
}
</script>
