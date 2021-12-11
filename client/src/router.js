import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Movie from './components/movies/Movie'
import Movies from './components/movies/Movies'
import Schedule from './components/schedule/Schedule'
import Session from './components/session/session'
import About from './components/About'
import Page404 from './components/404'
import Booking from './components/bookings/Booking'

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
      path: '/session/:id',
      component: Session
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/bookings',
      name: 'booking',
      component: Booking
    },
    {
      path: '/*',
      name: '404',
      component: Page404
    }
  ]
  
  export default new VueRouter({mode: 'history', routes})