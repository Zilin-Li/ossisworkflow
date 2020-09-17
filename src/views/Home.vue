<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <StartPage msg="OSSIS Worflow System"/>
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
