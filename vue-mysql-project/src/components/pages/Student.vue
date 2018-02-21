<template>
<div>
    <StuNavagation></StuNavagation>
    <router-view></router-view>
  

   
</div>
</template>
<script>
import StuInventoryTable from '../Student/StuInventoryTable'
import MyOppointmentTable from '../Student/MyOppointmentTable'
import StuNotice from '../Student/StuNotice'
import api from '../../axios.js'
import StuNavagation from '../Student/StuNavagation'

export default {
  data(){
      return{
          
      }
  },
  components:{
      StuInventoryTable,
      MyOppointmentTable,
      StuNotice,
      StuNavagation
  }
}
</script>
<style scoped>

div{
    text-align: left;
    width: 100%;
    
}
</style>

