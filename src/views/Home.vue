<template>
<div class="home">
  <Header />
  <StartPage />
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import StartPage from '@/components/StartPage.vue'

export default {
  name: 'Home',
  components: {
    Header,
    StartPage
  }
}
</script>

<style media="screen">
.home {
  height: 100%;
  /* font-family: Helvetica, Arial, "Lucida Family", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #559CB5; */
}
</style>
