<template>
  <div>
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/first_image.png" class="d-block w-100">
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://imdb-api.com/posters/original/xLNtaLaHudIzOqdEZ7R3lcDLrQQ.jpg" class="d-block w-100">
          <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/third_image.png" class="d-block w-100">
          <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <router-link :to="{ name: 'movies' }" class="btn btn-dark block btn-lg" tabindex="-1" role="button" aria-disabled="true">Experience it!</router-link>
  </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
      return {}
    }
}
</script>

<style>
   .carousel-item img  {
    height: 80vh;
    object-fit:cover ;
  }

  .block{
    display: block !important;
    margin: auto;
    margin-top: 40px;
    width: 20vw;
  }
</style>
