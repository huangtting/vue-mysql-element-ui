<template>
    <div>
      <h2>场馆信息</h2>
    <el-table
        ref="GymTable"
        :data="tableData"
        border      
        >

        <el-table-column
        property="campus"
        label="校区"
        width="120px">
        </el-table-column>

        <el-table-column
        property="kind"
        label="场馆"
        width="120px">
        </el-table-column>

       <el-table-column
        property="state"
        label="状态"
        width="120px">
        </el-table-column>
   
        <el-table-column
        prop="order" 
        >
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="close(scope.$index, scope.row)">关闭场馆</el-button>
            <el-button
                type="primary"
                size="mini"
                @click="open(scope.$index, scope.row)">开放场馆</el-button>
          </template>
        </el-table-column>
    </el-table>
  
    </div>
</template>

<script>
import api from '../../axios.js'

  export default {
    data() {
      return {
        tableData: [],
        currentRow: null
      }
    },

  mounted:function(){
        
         api.GetGym().then((response)=>{  
          console.log(response.date);      
                        for(let i=0;i<response.data.length;i++)
                        {
                          this.tableData.push(response.data[i]);
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
    },
    methods: {
     open(index,row){
       if(row.state!='avail')
       {
          row.state='avail';
          api.openGym({
            gym_id:row.gym_id
          });
       }
        
     },
     close(index,row){
       if(row.state!='non-avail')
       {
          row.state='non-avail';
          api.closeGym({
            gym_id:row.gym_id
          });
       }
       
     }
    }
  }
</script>
<style scoped>
     div{
        /* width:800px; */
        display: inline-block;
        text-align:left;
    }
</style>
