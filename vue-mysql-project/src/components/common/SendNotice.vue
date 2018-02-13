<template>
    <div>
        <h2>新增通知</h2>

        <el-form ref="form" v-bind:model="addform" label-width="100px"  >
            <el-form-item label="标题" prop="newtitle">
                <el-input v-model="addform.newtitle"></el-input>
            </el-form-item>

            <el-form-item label="内容" prop="newcontent">
                <el-input v-model="addform.newcontent"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addNotice()">发布新通知</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>
<script>
export default {
  data() {
      return {
        addform: {
          newtitle:'',
          newcontent:''
        }
      }
    },
    methods:{
        addNotice()
      {
        api.insertNotice({
            title:this.$data.addform.newtitle,
            content:this.$data.addform.newcontent
        }).then((response)=>{
          this.$store.commit('CLEARNOTICE');
         api.GetNotice().then((response)=>{  
          console.log(response.date);      
            for(let i=0;i<response.data.length;i++)
            {
              this.$store.commit('ADDNOTICE',response.data[i]);
              
            }                       
           },(reject)=>{
              console.log('get fail')
           })
          // console.log(response.body);
          // this.$store.commit('ADDNOTICE',response.data[i]);
        })
      }
    }
}
</script>

