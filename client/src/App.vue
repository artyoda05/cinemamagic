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
            </ul>
        </div>
    </nav>
    <router-view></router-view>
    <link href="/your-path-to-fontawesome/css/fontawesome.css" rel="stylesheet">
    <link href="/your-path-to-fontawesome/css/brands.css" rel="stylesheet">
    <link href="/your-path-to-fontawesome/css/solid.css" rel="stylesheet">
  </div>
</template>

<script>
export default {
    name: 'Layout',
    data: () => {
      return {}
    }
}
</script>
