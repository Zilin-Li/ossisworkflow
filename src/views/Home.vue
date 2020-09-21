<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/ossis_13-06-2012_resized.jpg"> -->
    <StartPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import StartPage from '@/components/StartPage.vue'

export default {
  name: 'Home',
  components: {
    StartPage
  }
}
</script>

<style media="screen">

.home{
  font-family: Helvetica,Arial,"Lucida Family",sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background-color: #559CB5;
}

</style>
