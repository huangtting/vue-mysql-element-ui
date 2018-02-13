<template>
    <div>
      <h2>场馆信息</h2>
    <el-table
        ref="ManagerInventoryTable"
        :data="tableData"
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        >

        <el-table-column
        type="index"
        width="50px">
        </el-table-column>

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
        property="date"
        label="日期"
        width="150px">
        </el-table-column>

        <el-table-column
        property="time"
        label="时段"
        width="120px">
        </el-table-column>

        <el-table-column
        property="avail_num"
        label="库存"
        >
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
        
         api.GetManagerInventory().then((response)=>{    
                        for(let i=0;i<response.data.length;i++)
                        {
                           let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                          this.tableData.push(response.data[i]);
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
    },
    methods: {
      setCurrent(row) {
        this.$refs.ManagerinventoryTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      order()
      {

      }
    }
  }
</script>
<style scoped>
     div{
  
        text-align:left;
    }
</style>
