<template>
  <div>
    <collapse>
          <div slot="trigger">我的余额</div>
          <div slot='content'>
             <div class="balance">
                <span>我的余额: </span>
                <span>{{ GetBalance}}</span>
              </div>  
              <el-button type="text" @click="dialogFormVisible = true">点击充值</el-button>

              <el-dialog title="余额充值" :visible.sync="dialogFormVisible">
                <el-form :model="depositform">
                  <el-form-item label="输入充值金额" :label-width="formLabelWidth">
                    <el-input v-model="depositform.acount" auto-complete="off"></el-input>
                  </el-form-item>
                 
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="comfirmDeposit">确 定</el-button>
                </div>
              </el-dialog>
              
          </div>
      </collapse>
      <collapse>
          <div slot="trigger">修改密码</div>
          <div slot='content'>
            <el-form ref="form" :model="changepasswordform" label-width="200px" >
            <el-form-item label="原密码">
              <el-input v-model="changepasswordform.password" style="width:200px;" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="changepasswordform.newPassword" style="width:200px;"  type="password"></el-input>
            </el-form-item>
            <el-form-item label="再次确认新密码">
              <el-input v-model="changepasswordform.comfirmPassword" style="width:200px;"  type="password"></el-input>
            </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="changepassword" size="medium">确认修改</el-button>
              <el-button size="medium" @click="clearInput">取消</el-button>
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
        changepasswordform: {
         password:'',
         newPassword:'',
         comfirmPassword:''
        },
        dialogFormVisible: false,
         formLabelWidth: '120px',
         depositform:{
           acount:''
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
                        
                       },(reject)=>{
                           console.log('get fail')
                       })
  },
  methods:{
   
      clearInput:function()
      {
        this.changepasswordform.password='';
        this.changepasswordform.newPassword='';
        this.changepasswordform.comfirmPassword='';
      },
      changepassword:function()
      {
        
        if(this.changepasswordform.newPassword!== this.changepasswordform.comfirmPassword) 
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
               oldpassword:this.changepasswordform.password,
               newpassword:this.changepasswordform.newPassword
           }).then((response)=>{
              if(response.data==='OK')
              {
                  this.$message({
                      type: 'success',
                      message: '修改成功'
                  })
                  this.changepasswordform.password='';
                  this.changepasswordform.newPassword='';
                  this.changepasswordform.comfirmPassword='';
              }
              else{
                this.$message({
                  showClose: true,
                  message: '密码输入错误',
                  type: 'error'
                });
              }
           })
           
               
           
        
        }
        // console.log(this.$store.state.userid);
      },
      comfirmDeposit:function()
      {
        this.dialogFormVisible = false;
        api.deposit({
               sno:this.$store.state.userid,
               money:this.depositform.acount
           }).then((response)=>{
            
              if(response.data==='OK')
              {
                  this.$message({
                      type: 'success',
                      message: '充值成功'
                  })
                  
                  this.$store.commit('SETUSERBALANCE',parseInt(this.$store.state.balance)+parseInt(this.depositform.acount));
                  this.depositform.acount=0;
              }
              else{
                this.$message({
                  showClose: true,
                  message: '充值失败',
                  type: 'error'
                });
              }
           })
      }
  },
  components:{
    collapse
  }
}
 
</script>
<style scoped>
 
</style>
 