<template>
  <div class="container booking-container">
      <h3>Bookings</h3>
    <div v-if="loaded">
      <div v-for="booking in bookings" v-bind:key="booking.id" class="row">
          <div class="col-4"><h4>{{ booking.session.movie.title }}</h4></div>
          <div class="col">
              <h5>{{booking.session.dateTime}} in {{booking.session.hall.name}}</h5>
              <p v-for="ticket in booking.tickets" v-bind:key="ticket">
                  Row: {{ ticket.row }}, Seat: {{ ticket.seat }}
              </p>
              <button type="button" class="btn btn-light" @click="cancelReservation(booking)">Cancel</button>
          </div>
      </div>
      <div class="row" v-if="bookings.length === 0">
          No bookings yet
      </div>
    </div>
         <div v-else class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<script>
export default {
    name: 'Booking',
    data () {
        return {
            bookings: [],
            loaded: false
        }
    },
    created () {
        this.$store.dispatch('bookings')
            .then(data => { 
                this.bookings = data;
                this.loaded = true;
            });
    },
    methods: {
        cancelReservation(booking) {
            // eslint-disable-next-line no-console
            console.log(booking);
            this.$store.dispatch('cancelReservation', {
                id: booking.id
            })
            .then( () => this.bookings.filter(value => { 
                return value != booking;
            }))
            .then(b => this.bookings = b);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.booking-container {
    margin-top: 20px;
  }

  .row {
      margin-top: 20px;
  }

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
