<template>
    <router-link class="btn btn-outline-primary session-link btn-lg" :to="`/session/${sessionRef}`" role="button">{{ time }}</router-link>
</template>

<script>
export default {
    name: 'time-element',
    props:{
        session : {
            type: Object,
            required: true
        }
    },
    data () {
      return {
        time : `${this.session.time.getHours()}:${this.session.time.getMinutes() != 0 ? this.session.time.getMinutes() : '00'}`,
        sessionRef : this.session.reference      
      }
    }
}
</script>

<style>
  .session-link {
    margin-right: 5px;
  }
</style>
