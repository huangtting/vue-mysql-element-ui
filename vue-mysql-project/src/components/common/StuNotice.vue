<template>
<div>
    <h2>通知</h2>
  <el-table
    :data="GetNotice"
  >
     <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="通知内容">
            <span>{{ props.row.content }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  
    <el-table-column
      label="通知"
      prop="title"
      width="450px">
    </el-table-column>

    <el-table-column
      label="日期"
      prop="date"
      width="120px">
    </el-table-column>

  </el-table>

 

</div>
  
</template>

<style>
  div{
    width: 60%;
    margin:0;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import api from '../../axios.js'

  export default {
    data() {
      return {
        addform: {
          newtitle:'',
          newcontent:''
        }
        
      }
    },
     
    computed:{
      GetNotice()
      {
        return this.$store.state.notice;
      }
    },
    mounted:function(){
        this.$store.commit('CLEARNOTICE');
         api.GetNotice().then((response)=>{  
          console.log(response.date);      
            for(let i=0;i<response.data.length;i++)
            {
               let date=new Date(response.data[i].date);
                response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
              this.$store.commit('ADDNOTICE',response.data[i]);
              
            }                       
           },(reject)=>{
              console.log('get fail')
           })
    },
    methods:{
      
    }
  }
</script>
<style scoped>

</style>
