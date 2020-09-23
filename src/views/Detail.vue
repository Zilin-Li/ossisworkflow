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
.jobDetail {
  height: 100%;
}
</style>
