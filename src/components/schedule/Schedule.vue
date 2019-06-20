<template>
    <div class="container schedule-container">
      <h2>Schedule</h2>
      <div>
        <schedule-element></schedule-element>
        <schedule-element></schedule-element>
      </div>
    </div>
</template>

<script>
import scheduleElement from './scheduleElement'

export default {
    name: 'Schedule',
    components: {
      scheduleElement
    },
    data () {
      return {}
    }
}
</script>

<style>
  .schedule-container {
    margin-top: 20px;
  }
</style>
