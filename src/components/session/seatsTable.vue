<template>
    <div class="d-flex flex-column">
        <row v-for="(seat, index) in seats" v-bind:key="index+1" :row="index+1" :seats="seat"></row>
    </div>
</template>

<script>
import Row from './row'

export default {
    name: 'seats-table',
    components: {
        Row
    },
    props: {
        seats: {
            type: Array,
            required: true
        }
    }
}
</script>
