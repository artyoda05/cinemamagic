import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Movie from './components/movies/Movie'
import Movies from './components/movies/Movies'
import Schedule from './components/schedule/Schedule'
import About from './components/About'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
  
  export default new VueRouter({mode: 'history', routes})