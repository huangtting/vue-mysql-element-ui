<template>
    <div>
        <h2>订单记录:</h2>
          <el-table
              ref="OppointmentTable"
              :data="oppointmentData"
              border
              >
           <el-table-column
              property="campus"
              label="校区"
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
              property="price"
              label="价格"
              >
              </el-table-column>

              <el-table-column
              property="state"
              label="状态"
              >
              </el-table-column>

          
          </el-table>
     
           <el-pagination
            layout="prev, next"
            page-size=page_size
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleCurrentPage">
          </el-pagination>
    </div>
</template>

<script>
import api from '../../axios.js'

  export default {
    data() {
      return {
        currentRow: null,
        oppointmentData:[],
        page_size:10
        // balance:''
      }
    },
    computed: {
  
    },
    mounted:function(){
     
         api.GetOppointment({
                        login_id: this.$store.state.userid,
                        currentPage:0,
                        page_size:this.page_size
                    }).then((response)=>{   
                          //  this.$store.commit('CLEAROPPOINTMENT');
                        for(let i=0;i<response.data.length;i++)
                        {
                          let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                        // console.log(response.data)
                          // this.$store.commit('SETOPPOINTMENT',response.data[i]);
                          this.oppointmentData.push(response.data[i]);
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
         
    },
    methods: {
     handleCurrentPage:function (currentPage) {
        api.GetOppointment({
                        login_id: this.$store.state.userid,
                        currentPage:currentPage,
                        page_size:this.page_size
                    }).then((response)=>{   
                           this.oppointmentData=[];
                        for(let i=0;i<response.data.length;i++)
                        {
                          let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                        // console.log(response.data)
                          // this.$store.commit('SETOPPOINTMENT',response.data[i]);
                          this.oppointmentData.push(response.data[i]);
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
       
     }
     
    
    }
  }
</script>
<style scoped>
    span{
      font-size:1.5em;
    }
    
    .balance{
        line-height:3em;
       
    }
</style>
