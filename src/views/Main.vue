<template>
<div class="mainPage">
  <!-- <Header /> -->
  <MainPage />
</div>
</template>

<script>
// import Header from '@/components/Header.vue'
import MainPage from '@/components/MainPage.vue'

export default {
  name: 'Main',
  components: {
    MainPage,
    // Header
  }
}
</script>

<style media="screen">
.mainPage {
  height: 100%;
  font-family: Helvetica, Arial, "Lucida Family", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #E8E8E8;
}
</style>
