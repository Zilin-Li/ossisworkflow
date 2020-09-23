<template>
  <div class="startPage">
    <h1>OSSIS WORKFLOW INTERGRATION SYSTEM</h1>
    <input type="button" value="Get Start" @click="linkToMain" class="getToken btn btn-light btn-lg">
  </div>
</template>


<script>

// export default {
//   beforeCreate: function() {
//        document.body.className = 'startPage';
//    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.startPage{
  text-align: center;
  height:100%;
  font-style: bold;
  padding-top: 10%
}

h1{
  font-size: 3.5vw;
  color: white;
}

.getToken{
  margin-top: 5%;
  width:30%;
  border-radius:25px;
  font-size: 1.2vw;
}

</style>
