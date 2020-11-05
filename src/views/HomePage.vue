<template>
<div class="home">
  <Header/>
  <div class="startPage">
    <h1>OSSIS WORKFLOW INTERGRATION SYSTEM</h1>
    <input type="button" value="Start" @click="linkToMain" class="getToken btn btn-light btn-lg">
  </div>

</div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Home',
  beforeCreate: function() {
    document.body.className = 'startPage';
  },

  components: {
    Header
  },

  data() {
    return {
      workflowMaxAuth: ""
    }
  },

  methods: {

    linkToMain() {
      window.location = 'http://localhost/authorization'
      // window.location = 'https://ossisserver.willin.xyz/authorization'
    }
  }
}
</script>


<style scoped>
.home {
  height: 100%;
  /* font-family: Helvetica, Arial, "Lucida Family", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #559CB5; */
}

.startPage {
  text-align: center;
  height: 100%;
  font-style: bold;
  padding-top: 10%
}

h1 {
  font-size: 3.5vw;
  color: white;
}

.getToken {
  margin-top: 5%;
  width: 30%;
  border-radius: 25px;
  font-size: 1.2vw;
}
</style>
