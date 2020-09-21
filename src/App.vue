<template>
  <div id="app">
    <header>
      <img id ="logo" alt="Vue logo" src="./assets/ossis_13-06-2012_resized.jpg" >
    </header>
    <router-view/>
  </div>
</template>

<style>
#app {
  height:100%;
}

header{
width: auto;
height:110px;
background-color: white;
position:relative;
padding-left: 5%;


}

#logo{
  height: 45%;
  width:auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin:auto;
}


</style>
