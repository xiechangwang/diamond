<template>
  <div id="app">
    <!--<BHeader></BHeader>
    <BNavBar></BNavBar>-->
    <router-view></router-view>
  </div>
</template>

<script>
//import BHeader from './components/BHeader.vue'
//import BNavBar from './components/BNavBar.vue'

export default {
  name: 'app',
  data(){
      return{

      }
  },
  components:{
//  BHeader,
//  BNavBar
  }
}
</script>

<style>
/** {
  margin: 0;
  padding: 0;
}
body,html{
  width: 100%;
  height: 100%;
}
@media (max-width:1500px) {
  .cont{
    width: calc(100% - 11%) !important;
  }
}
@media (max-width: 1400px) {
  .cont{
    width: calc(100% - 11.5%) !important;
  }
}
@media (max-width: 1300px) {
  .cont{
    width: calc(100% - 12%) !important;
  }
}
@media (max-width: 1200px) {
  .cont{
    width: calc(100% - 13%) !important;
  }
}
@media (max-width: 1100px) {
  .cont{
    width: calc(100% - 13.5%) !important;
  }
}


.cont{
  position: fixed;
  width: calc(100% - 10%);
  top: 57px;
  right:0;
  height:calc(100% - 57px);
  overflow-y: auto;
  
}*/
</style>
