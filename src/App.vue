<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Navbar</a>
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
            </ul>
        </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Layout',
    data () {
      return {}
    }
}
</script>
