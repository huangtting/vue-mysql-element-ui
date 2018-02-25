<template>
<div>
    <Navagation></Navagation>
    <router-view></router-view>
   
</div>
</template>
<script>
import Gym from '../Manager/GymTable'
import ManagerNotice from '../Manager/ManagerNotice'
import Navagation from '../Manager/ManagerNavagation'

export default {
  data(){
      return{

      }
  },
  components:{
    Gym,
    ManagerNotice,
    Navagation
  }
}
</script>
<style scoped>
div{
    width:100%;
   
}
</style>
