<template>
    <div>
     
        <tabs>
        <tab name="东校区" :selected="true">
            <h2>今明场馆订单:</h2>
           <collapse>
            <div slot="trigger">东校区羽毛球场</div>
            <div slot='content'>
            <el-table
              ref="InventoryTable"
              :data="eastBadmintonData"
              highlight-current-row
              border
              @current-change="handleCurrentChange"
              >

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
              <el-table-column
              property="no"
              label="预约人"
              >
              </el-table-column>
          </el-table>
            </div>
          </collapse>
          <collapse>
            <div slot="trigger">东校区网球场</div>
            <div slot='content'> 
               <el-table
              ref="InventoryTable"
              :data="eastTennisData"
              highlight-current-row
              border
              @current-change="handleCurrentChange"
              >

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
            
             <el-table-column
              property="no"
              label="预约人"
              >
              </el-table-column>
          </el-table>
            </div>
          </collapse>
        </tab>
        <tab name="南校区">
            <h2>今明场馆订单:</h2>
           <collapse>
            <div slot="trigger">南校区羽毛球场</div>
            <div slot='content'>
               <el-table
              ref="InventoryTable"
              :data="southBadmintonData"
              highlight-current-row
              border
              @current-change="handleCurrentChange"
              >

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
            <el-table-column
              property="no"
              label="预约人"
              >
              </el-table-column>
          </el-table>
            </div>
          </collapse>
          <collapse>
            <div slot="trigger">南校区网球场</div>
            <div slot='content'> 
             <el-table
              ref="InventoryTable"
              :data="southTennisData"
              highlight-current-row
              border
              @current-change="handleCurrentChange"
              >

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
            <el-table-column
              property="no"
              label="预约人"
              >
              </el-table-column>
            </el-table>
            </div>
          </collapse>
        </tab>
         
      </tabs>
          
    </div> 
</template>

<script>
import api from '../../axios.js'
import tabs from '../common/tabs'
import tab from '../common/tab'
import collapse from '../common/collapse'

  export default {
    data() {
      return {
        eastBadmintonData: [],
        eastTennisData:[],
        southBadmintonData:[],
        southTennisData:[],
        currentRow: null,
        date: '',
      }
    },
    mounted:function(){
      api.southBadminton().then((response)=>{        
                        for(let i=0;i<response.data.length;i++)
                        {
                           let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                          if(response.data[i].no===null) response.data[i].no='暂无人预定';
                          this.southBadmintonData.push(response.data[i]);
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
      api.southTennis().then((response)=>{        
                        for(let i=0;i<response.data.length;i++)
                        {
                           let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                          if(response.data[i].no===null) response.data[i].no='暂无人预定';
                          this.southTennisData.push(response.data[i]);
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
      api.eastBadminton().then((response)=>{        
                        for(let i=0;i<response.data.length;i++)
                        {
                           let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                          if(response.data[i].no===null) response.data[i].no='暂无人预定';
                          this.eastBadmintonData.push(response.data[i]);
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
      api.eastTennis().then((response)=>{        
                        for(let i=0;i<response.data.length;i++)
                        {
                           let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                          if(response.data[i].no===null) response.data[i].no='暂无人预定';
                          this.eastTennisData.push(response.data[i]);
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
    },
        
    components:{
      tabs,
      tab,
      collapse
    }
  }
</script>
<style scoped>
  div{
        width:99%;
        text-align:left;
    }
</style>

