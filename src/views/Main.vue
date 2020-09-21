<template>
  <div class="mainPage">

    <MainPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainPage from '@/components/MainPage.vue'

export default {
  name: 'Main',
  components: {
    MainPage
  }
}
</script>

<style media="screen">

.mainPage{
  height: 100%;
}

</style>
