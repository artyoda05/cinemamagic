<template>
    <div class="container about-container">
      <h3>About cinema</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet nulla facilisis, rhoncus mi in, congue ipsum. Mauris bibendum lacus sit amet pulvinar consectetur. Aenean sed enim eget diam consequat fringilla nec vitae ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eget velit bibendum, varius sapien a, maximus risus. Cras condimentum sapien ut purus mattis, dignissim eleifend massa gravida. Etiam sed nibh blandit, facilisis est quis, cursus augue. Donec et ligula in urna volutpat venenatis. Curabitur at purus sapien. Etiam malesuada diam in semper ultrices. Quisque viverra erat vel placerat ultricies. Duis cursus pellentesque est, sed efficitur neque placerat non. Vivamus egestas sollicitudin est, vitae maximus lectus viverra vel.</p>
      <p>Proin massa leo, aliquet non aliquam et, placerat quis massa. Donec vel mi nisi. Phasellus placerat accumsan ipsum, nec interdum quam ultrices in. Aliquam malesuada odio ac rhoncus molestie. Pellentesque id porttitor nibh. Duis vulputate tincidunt tortor nec aliquam. Mauris porta feugiat tristique. Phasellus convallis lacus a vehicula posuere. Ut scelerisque mollis metus sed rhoncus. In et pretium turpis. Curabitur et justo lacus. Fusce non tincidunt ipsum. Integer libero nisl, cursus pretium est quis, pretium euismod urna.</p>
      <p>Mauris in enim consectetur, pharetra velit sit amet, ultricies neque. Aenean consectetur facilisis lorem, at eleifend turpis varius ut. Aenean at porta sem. Phasellus condimentum velit in lectus auctor tincidunt. Pellentesque ultrices fringilla tempus. Sed tempor urna id orci vehicula aliquam. Morbi ac iaculis sapien. Fusce rutrum molestie velit, vitae fringilla velit fringilla accumsan. Vestibulum ut odio eget neque elementum elementum. Mauris ligula sem, gravida id eleifend eu, mollis et justo. Pellentesque tincidunt volutpat ex, eu vulputate ipsum consequat vel. Sed dictum semper sollicitudin. Morbi auctor viverra facilisis. Donec dolor orci, ultrices at blandit dignissim, molestie quis sapien. Curabitur sagittis dignissim suscipit. Nam bibendum elit nibh, sed ornare purus imperdiet posuere.</p>
      <h4>Where to find us</h4>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1270.3264100842812!2d30.456091305776877!3d50.44756711375293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd4e0abc33e65f9a6!2sKPI+Faculty+of+Applied+Mathematics!5e0!3m2!1sen!2sua!4v1560700774536!5m2!1sen!2sua"
       frameborder="0" style="border:0" allowfullscreen></iframe>
       <h4>Our contacts</h4>
      <div class="d-flex flex-column bd-highlight mb-3">
        <div class="d-flex flex-row align-items-center">
          <i class="fas fa-phone fa-2x"></i>
          <div class="left-margin">+380 000 000 000</div>
        </div>
        <div class="d-flex flex-row align-items-center">
          <i class="fas fa-envelope fa-2x"></i>
          <div class="left-margin">contact@example.com</div>
        </div>
        <div class="d-flex flex-row align-items-center">
          <i class="fab fa-instagram fa-2x"></i>
          <div class="left-margin">link</div>
        </div>
        <div class="d-flex flex-row align-items-center">
          <i class="fab fa-facebook fa-2x"></i>
          <div class="left-margin">link</div>
        </div>
        <div class="d-flex flex-row align-items-center">
          <i class="fab fa-twitter fa-2x"></i>
          <div class="left-margin">link</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    data () {
      return {}
    }
}
</script>

<style>
  iframe {
    display: block;
    margin: auto;
    width: 100%;
    height: 25vh;
  }
  .about-container {
    margin-top: 20px;
  }

  h4 {
    margin-top: 20px;
  }

  .fas, .fab {
    margin-right: 15px;
  }
  
  .flex-column .flex-row {
    height: 50px;
  }
</style>
