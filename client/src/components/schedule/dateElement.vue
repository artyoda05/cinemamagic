<template>
    <div class="container-fluid">
      <hr>
      <div class="row">
        <div class="col-3">
          {{ date }}
        </div>
        <div class="col">
          <div class="d-flex flex-nowrap">
              <time-element v-for="session in sessions" v-bind:key="session.time.toString()" :session="session"></time-element>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import TimeElement from './timeElement'

export default {
    name: 'date-element',
    components: {
        TimeElement
    },
    props:{
        sessions : {
            type: Array,
            required: true
        },
        date : {
            type: String,
            required: true
        }
    },
    data () {
      return {}
    }
}
</script>
