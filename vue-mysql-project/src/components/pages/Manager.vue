<template>
<div>
    <Navagation></Navagation>
    <router-view></router-view>
    <!-- <div>
        <Gym></Gym>
    </div>
    <div>
        <MangerInventory></MangerInventory>
    </div>
   
    <div>
        <ManagerNotice></ManagerNotice>
    </div> -->
   
</div>
</template>
<script>
import Gym from '../common/GymTable'
import ManagerNotice from '../Manager/ManagerNotice'
import MangerInventory from '../Manager/ManagerInventoryTable'
import Navagation from '../Manager/ManagerNavagation'

export default {
  data(){
      return{

      }
  },
  components:{
    Gym,
    ManagerNotice,
    MangerInventory,
    Navagation
  }
}
</script>
<style scoped>
div{
    width:100%;
   
}
</style>
