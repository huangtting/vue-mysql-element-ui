<template>
    <div>
      <h2>场馆信息</h2>
    <el-table
        ref="InventoryTable"
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
        property="site_no"
        label="场地号"
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
        property="price"
        label="价格"
        width="100px">
        </el-table-column>

        <el-table-column
        property="state"
        label="状态"
        width="100px">
        </el-table-column>

        <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="order(scope.$index,scope.row)" size="mini">点击预约</el-button>
        </template>
          <!-- <template slot-scope="scope">
          <el-button
            size="mini"
            @click="order(scope.$index, scope.row)">我要预约</el-button>
         
        </template> -->
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
        
         api.GetStuInventory().then((response)=>{  
          console.log(response.date);      
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
    computed: {
      GetBalance () {
        return this.$store.state.balance;
      } 
    },
    methods: {
      setCurrent(index,row) {
        this.$refs.inventoryTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
    
      order(index,row){
        if(row.state=='avail')
        {
          
             this.$confirm('是否确定预约？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '预约成功!'

                });
                row.state='non-avail';
                this.$store.commit('USERBALANCE',row.price);
                let data={
                  "date":row.date,
                  "campus":row.campus,
                  "time":row.time,
                  "kind":row.kind,
                  "site_no":row.site_no,
                  "price":row.price,
                  "state":'undone'
                }
                this.$store.commit('SETOPPOINTMENT',data);
                api.InsertOrder({
                  site_id:row.site_id,
                  date:row.date,
                  time:row.time,
                  sno:this.$store.state.userid,
                  state:'undone',
                  price:row.price
                }).then((response=>{
                  console.log(response);
                }));

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消预约'
                });          
              });
        }
         
      }
    }
  }
</script>
<style scoped>
     div{
        /* width:800px; */
        /* display: inline-block; */
        text-align:left;
    }
</style>
