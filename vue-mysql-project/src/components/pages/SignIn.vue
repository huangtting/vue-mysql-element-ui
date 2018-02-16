<template>
    <div>
        <el-form ref="form" v-bind:model="form" label-width="100px" v-bind:rules='rules' >
            <el-form-item label="学号" prop="loginId">
                <el-input v-model.number="form.loginId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="loginPassword">
                <el-input v-model="form.loginPassword" type='password'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">学生登录</el-button>
                <el-button type="primary" @click="managerSubmint()">管理员登录</el-button>
                <el-button @click="resetForm('form')">取消</el-button>
                
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import api from '../../axios.js'

export default {
    data(){
        return{
            form:{
                loginId:'',
                loginPassword:''
            },
          
            rules:{
                loginId:[
                    { required: true, message: '学号不能为空'},
                    { type: 'number', message: '学号必须为数字值'}
                ],
                loginPassword:[
                    {required:true,message:'请输入密码'}
                ]
            }

        }
    },
    
    methods:{
        managerSubmint(){
            if(this.$data.form.loginId=='10086'&& this.$data.form.loginPassword=='10086')
            {
    
                this.$router.push({name:'Manager'})
            }
             else{
                    this.$alert('密码错误', '提示', {
                                confirmButtonText: '确定'
                                });
                }
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                
                    api.userSignin( {
                        login_id: this.$data.form.loginId,
                        login_password: this.$data.form.loginPassword
                    }).then((response)=>{
                        // console.log(response);
                        if(response.data.isok=='1')
                        {
                            this.$store.commit('USERID', this.$data.form.loginId);
                            this.$store.commit('LOGIN',response.data.token);
                             let redirectUrl = decodeURIComponent('/student');
                                //跳转到指定的路由
                                // console.log(this.$data.form.loginId);
                                // this.$router.push({name:'Student',params: {login_id: this.$data.form.loginId}});
                                // this.$router.push({name:'Student'})
                                this.$router.push({ path: '/student/notice' })
                        }
                        else{
                             this.$alert('密码错误', '提示', {
                            confirmButtonText: '确定',
                          
                            });
                        }
                        
                       },(reject)=>{
                           console.log('post fail')
                       })
                //    发送axios
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    
        
    }
}
</script>
<style scoped>
    div{
        width:500px;
        display: inline-block;
    }
</style>
