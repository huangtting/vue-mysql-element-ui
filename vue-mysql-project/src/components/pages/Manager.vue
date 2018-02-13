<template>
<div>
    <div>
        <Gym></Gym>
    </div>
    <div>
        <MangerInventory></MangerInventory>
    </div>
   
    <div>
        <ManagerNotice></ManagerNotice>
    </div>
   
</div>
</template>
<script>
import Gym from '../common/GymTable'
import ManagerNotice from '../common/ManagerNotice'
import MangerInventory from '../common/ManagerInventoryTable'
export default {
  data(){
      return{

      }
  },
  components:{
    Gym,
    ManagerNotice,
    MangerInventory
  }
}
</script>
<style scoped>
div{
    width:800px;
    text-align:left;
}
</style>
