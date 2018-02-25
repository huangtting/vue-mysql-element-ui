<template>
<div>
  <el-form ref="form" :model="signupform" label-width="80px">
    <el-form-item label="学号/工号">
      <el-input v-model="signupform.no"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="signupform.password"></el-input>
    </el-form-item>
    <el-form-item label="密码确认">
      <el-input v-model="signupform.comfirmPassword"></el-input>
    </el-form-item>
      <el-form-item >
      <el-radio-group v-model="signupform.identity" label="身份选择">
        <el-radio label="管理员"></el-radio>
        <el-radio label="学生"></el-radio>
      </el-radio-group>
    </el-form-item>
     <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="route">返回</el-button>
    </el-form-item>
  </el-form>
</div>
  
</template>
<script>
import api from '../../axios.js';
export default {
  data(){
    return {
      signupform:{
        no:'',
        password:'',
        comfirmPassword:'',
        identity:''
      }
    }
  },
  methods:{
    route:function(){
      this.$router.push({path:'/sigin'})
    },
    onSubmit:function()
    {
        if(password!==comfirmPassword)
        {
            this.$alert('两次输入密码不同', '提示', {
                confirmButtonText: '确定'
            })
        }
        else{
            api.userSignUp({
              no:this.signupform.no,
              password:this.signupform.password,
              identity:this.signupform.identity
            }).then(response=>{
                  this.$alert('恭喜你注册成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push({path:'/sigin'});
                }
            })
            });
        }
       
    }
  }
}
</script>
<style scoped>
 div{
        width:400px;
        display: inline-block;
        text-align:left;
        /* margin:0 auto; */
    }
</style>
