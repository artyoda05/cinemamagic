<template>
    <router-link class="btn btn-outline-primary" :to="`/session/${sessionRef}`" role="button">{{ time }}</router-link>
</template>

<script>
export default {
    name: 'time-element',
    props:{
        time: {
            type: Date,
            required: true
        },
        sessionRef: {
            type: string,
            required: false
        }
    },
    data () {
      return {
        time: this.time.toLocaleTimeString(),
        sessionRef: this.sessionRef      
      }
    }
}
</script>

<style>
  .schedule-image {
    width: 90%;
    height: auto;

  }
</style>
