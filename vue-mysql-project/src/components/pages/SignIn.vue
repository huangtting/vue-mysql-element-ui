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
                <el-button type="primary" button size="mini" @click="onSubmit('form','student')">学生登录</el-button>
                <el-button type="primary" button size="mini" @click="onSubmit('form','manager')">管理员登录</el-button>
                <el-button button size="mini" @click="route" >注册</el-button>
                
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
                this.$alert('密码错误', '提示', { confirmButtonText: '确定'});
            }
        },
        onSubmit(formName,role) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.userSignin( {
                        login_id: this.$data.form.loginId,
                        login_password: this.$data.form.loginPassword,
                        role:role
                    }).then((response)=>{
                        if(response.data.isok=='1')
                        {
                            if(response.data.role==='student')
                            {
                                this.$store.commit('SetRole','student');
                                this.$store.commit('USERID', this.$data.form.loginId);
                                this.$store.commit('LOGIN',response.data.token);
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/student/notice');
                                this.$router.push({path: redirect});
                            }
                            else
                            {
                                this.$store.commit('SetRole','manager');
                                this.$store.commit('USERID', this.$data.form.loginId);
                                this.$store.commit('LOGIN',response.data.token);
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/manager/notice');
                                this.$router.push({path: redirect});
                        
                            }
                            
                        }
                        else{
                            this.$alert('密码错误', '提示', {
                            confirmButtonText: '确定'
                            });
                        }
                        
                       },(reject)=>{
                           console.log('post fail')
                       })
                } else {
                    return false;
                }
            });
        },
        route() {
            this.$router.push({path: '/signup'});;
        }
    
        
    }
  
}
</script>
<style scoped>
    div{
        width:400px;
        display: inline-block;
    }
</style>
