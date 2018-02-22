<template>
  <div>
    <collapse>
          <div slot="trigger">我的余额</div>
          <div slot='content'>
             <div class="balance">
                <span>我的余额: </span>
                <span>{{ GetBalance}}</span>
              </div>  
          </div>
      </collapse>
      <collapse>
          <div slot="trigger">修改密码</div>
          <div slot='content'>
            <el-form ref="form" :model="form" label-width="200px" >
            <el-form-item label="原密码">
              <el-input v-model="form.password" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.newPassword" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="再次确认新密码">
              <el-input v-model="form.comfirmPassword" style="width:200px;"></el-input>
            </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="changepassword" size="medium">确认修改</el-button>
              <el-button size="medium">取消</el-button>
            </el-form-item>
            </el-form>
            
            
          </div>
      </collapse>
  </div>
   
</template>
<script>
import collapse from '../common/collapse'
import api from '../../axios'
export default {
    data() {
      return {
        form: {
         password:'',
         newPassword:'',
         comfirmPassword:''
        }
      }
    },
  computed:{
    GetBalance () {
          return this.$store.state.balance;
        },
  },
  mounted:function(){
      api.GetBalance({
                        login_id: this.$store.state.userid
                    }).then((response)=>{ 
                      this.$store.commit('SETUSERBALANCE',response.data[0].balance);
                        console.log(this.$store.balance);
                       },(reject)=>{
                           console.log('get fail')
                       })
  },
  methods:{
      changepassword:function()
      {
        
        if(this.form.newPassword!== this.form.comfirmPassword) 
        {
             this.$message({
              showClose: true,
              message: '两次输入的密码不同',
              type: 'error'
            });
        }
        else{
          api.changePassword({
               sno:this.$store.state.userid,
               oldpassword:this.form.password,
               newpassword:this.form.newPassword
           }).then((response)=>{
             console.log(response);
              // if(response.data.imformation==='OK')
              // {
              //     this.$message({
              //         type: 'success',
              //         message: '修改成功'
              //     })
              // }
              // else{
              //   this.$message({
              //     showClose: true,
              //     message: '密码输入错误',
              //     type: 'error'
              //   });
              // }
           })
           
               
           
        
        }
        // console.log(this.$store.state.userid);
        
      

      }
  },
  components:{
    collapse
  }
}
 
</script>
<style scoped>
 div{
          width:98%;
      }
</style>
 