<template>
    <div v-if="available" v-on:click="onClick" class="seat available-seat" :class="{ 'chosen-sit': chosen }" >{{ seat }}</div>
    <div v-else class="seat unavailable-seat"> {{ seat }} </div>
</template>

<script>
export default {
    name: 'seat',
    props: {
        seat: {
            type: Number,
            required: true
        },
        row: {
            type: Number,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            chosen: false
        }
    },
    methods: {
        onClick () {
            this.chosen = !this.chosen;
            if (this.chosen)
                this.$store.commit('addSeat', {
                    seat: this.seat,
                    row: this.row
                });
            else 
               this.$store.commit('removeSeat', {
                    seat: this.seat,
                    row: this.row
                }); 
        }
    }
}
</script>

<style>
    .seat {
        margin: 1px;
        height: 40px;
        width: 40px;
        border: solid 1px;
        border-radius: 15%;
        text-align: center;
        text-align: center;
        vertical-align: middle;
        line-height: 36px;  
    }

    .unavailable-seat {
        background-color:#d9d9d9;
        border-color: #595959;
        color: #595959;
    }

    .available-seat {
        background-color:white;
        border-color: #007bff;
        color: #007bff;
    }

    .available-seat:hover, .chosen-sit {
        color:white;
        background-color: #007bff;
    }

    .available-seat:hover {
        cursor: pointer;
    }
</style>
