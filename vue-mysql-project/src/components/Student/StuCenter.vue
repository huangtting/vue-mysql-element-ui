<template>
   <el-button @click="changepassword">修改密码</el-button>

</template>
<script>
export default {
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
  }
}
 
</script>
<style scoped>

</style>
