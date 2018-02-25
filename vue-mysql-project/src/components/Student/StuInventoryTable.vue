<template>
    <div>
      <div>
        <tabs>
        <tab name="东校区" :selected="true">
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

              <el-table-column>
              <template slot-scope="scope">
                <el-button type="text" @click="order(scope.$index,scope.row)" size="mini">点击预约</el-button>
              </template>
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

              <el-table-column>
              <template slot-scope="scope">
                <el-button type="text" @click="order(scope.$index,scope.row)" size="mini">点击预约</el-button>
              </template>
              </el-table-column>
          </el-table>
            </div>
          </collapse>
        </tab>
        <tab name="南校区">
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

              <el-table-column>
              <template slot-scope="scope">
                <el-button type="text" @click="order(scope.$index,scope.row)" size="mini">点击预约</el-button>
              </template>
              </el-table-column>
          </el-table>
            </div>
          </collapse>
          <collapse>
            <div slot="trigger">南校区网球场</div>
            <div slot='content'> 
             <el-table
            
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

              <el-table-column>
              <template slot-scope="scope">
                <el-button type="text" @click="order(scope.$index,scope.row)" size="mini">点击预约</el-button>
              </template>
              </el-table-column>
            </el-table>
            </div>
          </collapse>
        </tab>
      </tabs>
    </div>


     
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
        
      }
    },
    mounted:function(){
      let now=new Date();
      api.southBadminton().then((response)=>{        
                        for(let i=0;i<response.data.length;i++)
                        {
                           let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                          let hour=now.getHours();
                          let deadline=response.data[i].time.substr(6,2);

                          if(deadline >= hour)
                          {
                            response.data[i].state='non-avail';
                          } 
                         
                         
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
                            let hour=now.getHours();
                          let deadline=response.data[i].time.substr(6,2);

                          if(deadline >= hour)
                          {
                            response.data[i].state='non-avail';
                          } 
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
                            let hour=now.getHours();
                          let deadline=response.data[i].time.substr(6,2);

                          if(deadline >= hour)
                          {
                            response.data[i].state='non-avail';
                          } 
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
                            let hour=now.getHours();
                          let deadline=response.data[i].time.substr(6,2);

                          if(deadline >= hour)
                          {
                            response.data[i].state='non-avail';
                          } 
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
      order(index,row){
        if(row.state=='avail')
        {
          
             this.$confirm('是否确定预约？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let data={
                  "date":row.date,
                  "campus":row.campus,
                  "time":row.time,
                  "kind":row.kind,
                  "site_no":row.site_no,
                  "price":row.price,
                  "state":'undone'
                }
                
                api.InsertOrder({
                  site_id:row.site_id,
                  date:row.date,
                  time:row.time,
                  sno:this.$store.state.userid,
                  state:'undone',
                  price:row.price
                }).then((response=>{
                  if(response.data==='OK')
                  {
                    this.$store.commit('SETOPPOINTMENT',data);
                    row.state='non-avail';
                     this.$store.commit('USERBALANCE',row.price);
                    this.$message({
                          type: 'success',
                          message: '预约成功!'

                        });  
                  }
                }),err=>{
                  this.$message({
                      type: 'info',
                      message: '已取消预约'
                    });   
                });

              })
        }
         
      }
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
      }
</style>

