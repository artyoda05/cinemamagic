<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            <img src="./assets/icon.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
            Cinemamagic
        </router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'movies' }" class="nav-link">Movies</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to=" { name: 'schedule' } " class="nav-link">Schedule</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to=" { name: 'about' } " class="nav-link">About</router-link>
                </li>
                <li v-if="logined" class="nav-item">
                    <router-link :to=" { name: 'booking' } " class="nav-link">Bookings</router-link>
                </li>
            </ul>
        </div>
        
        <button v-if="!logined" class="btn btn-link" type="button" @click="register = true">Register</button>
        <button v-if="!logined" class="btn btn-link" type="button" @click="login = true">Login</button>
                
    </nav>
    <router-view></router-view>
    <login-modal v-if="login" @logined="logined = true" @close="login = false" :title="'ddddd'" :time="'time'" />
    <register-modal v-if="register" @registered="logined = true" @close="register = false" :title="'ddddd23123123'" :time="'time'" />
    <!-- <link href="/your-path-to-fontawesome/css/fontawesome.css" rel="stylesheet">
    <link href="/your-path-to-fontawesome/css/brands.css" rel="stylesheet">
    <link href="/your-path-to-fontawesome/css/solid.css" rel="stylesheet"> -->
  </div>
</template>

<script>
import login from './components/Login.vue'
import register from './components/Register.vue'

export default {
    name: 'Layout',
    components: {
        'login-modal': login,
        'register-modal': register
    },
    data: () => {
      return {
          logined: false,
          login: false,
          register: false
      }
    }
}
</script>

<style scoped>
#app {
    margin-bottom: 20px;
}

.bttt {
    margin: 5px;
    margin-left: 10px;
    color: #9a9da0;
}
</style>
