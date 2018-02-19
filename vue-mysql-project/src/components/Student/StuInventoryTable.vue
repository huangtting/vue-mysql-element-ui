<template>
    <div>
      <h2>场馆预定</h2>
      <el-tabs>
    <el-tab-pane label="东校区" name="east" >
      <el-collapse accordion>
        <el-collapse-item title="羽毛球馆" >
        
        </el-collapse-item>
        <el-collapse-item title="网球馆" >
        
        </el-collapse-item>
      
      </el-collapse>
      <!-- <el-table
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
              </el-table-column>
          </el-table> -->

    </el-tab-pane>
    <el-tab-pane label="南校区" name="south">
        <el-collapse-item title="羽毛球馆" >
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
         <el-collapse-item title="网球馆" >
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>

      <el-table
              ref="InventoryTable"
              :data="tableData"
              highlight-current-row
              border
              @current-change="handleCurrentChange"
              >

              <el-table-column
              type="index"
              
              >
              </el-table-column>

              <el-table-column
              property="campus"
              label="校区"
              >
              </el-table-column>

              <el-table-column
              property="kind"
              label="场馆"
              >
              </el-table-column>

            <el-table-column
              property="site_no"
              label="场地号"
              >
              </el-table-column>

              <el-table-column
              property="date"
              label="日期"
              >
              </el-table-column>

              <el-table-column
              property="time"
              label="时段"
              >
              </el-table-column>

              <el-table-column
              property="price"
              label="价格"
              >
              </el-table-column>

              <el-table-column
              property="state"
              label="状态"
              >
              </el-table-column>

              <el-table-column>
              <template slot-scope="scope">
                <el-button type="text" @click="order(scope.$index,scope.row)" size="mini">点击预约</el-button>
              </template>
              </el-table-column>
          </el-table>

    </el-tab-pane>
   
  </el-tabs>
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
        width:100%;
    }
   
</style>
