<template>
<div>
    <div>
        <MyOppointmentTable></MyOppointmentTable>
    </div>
    <div>
        <StuInventoryTable></StuInventoryTable>
    </div>
    <div>
         <StuNotice></StuNotice>
    </div>

    <el-button @click="changepassword">修改密码</el-button>

</div>
</template>
<script>
import StuInventoryTable from '../common/StuInventoryTable'
import MyOppointmentTable from '../common/MyOppointmentTable'
import StuNotice from '../common/StuNotice'
import api from '../../axios.js'

export default {
  data(){
      return{
          
      }
  },
  methods:{
      changepassword:function()
      {
           this.$prompt('请输入邮箱', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
       
        }).then(({ value }) => {
          
          
        // console.log(this.$store.state.userid);
        api.changePassword({
               sno:this.$store.state.userid,
               password:value
           }).then(
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
           );
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });

      }
  },
  components:{
      StuInventoryTable,
      MyOppointmentTable,
      StuNotice
  }
}
</script>
<style scoped>
div{
    text-align: left;
    width: 1000px;
}
</style>

