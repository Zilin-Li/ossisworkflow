<template>
<div class="jobDetail">
  <Header />
  <DetailPage/>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import DetailPage from '@/components/JobDetail.vue'

export default {
  name: 'Detail',
  components: {
    DetailPage,
    Header
  }
}
</script>

<style media="screen">
/* .jobDetail {
  height: 100%;
  font-family: Helvetica, Arial, "Lucida Family", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #E8E8E8;
} */
</style>
