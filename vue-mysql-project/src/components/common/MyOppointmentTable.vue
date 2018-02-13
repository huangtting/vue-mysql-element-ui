<template>
    <div>
        <div class="balance">
          <span>我的余额: </span>
          <span>{{ GetBalance}}</span>
        </div>  
        <h2>订单记录:</h2>
          <el-table
              ref="OppointmentTable"
              :data="GetOppointment"
              border
              >
        

              <el-table-column
              property="date"
              label="日期"
              width="120px">
              </el-table-column>

              <el-table-column
              property="campus"
              label="校区"
              width="120px">
              </el-table-column>

              <el-table-column
              property="time"
              label="时段"
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
              width="80px">
              </el-table-column>
            

              

              <el-table-column
              property="price"
              label="价格"
              width="120px">
              </el-table-column>

              <el-table-column
              property="state"
              label="状态"
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
       
        currentRow: null,
        // balance:''
      }
    },
    computed: {
      GetBalance () {
        return this.$store.state.balance;
      },
      GetOppointment()
      {
        return this.$store.state.oppointment;
      } 

    },
    mounted:function(){
      this.$data.tableData=[];
         api.GetOppointment({
                        login_id: this.$store.state.userid
                    }).then((response)=>{   
                           this.$store.commit('CLEAROPPOINTMENT');
                        for(let i=0;i<response.data.length;i++)
                        {
                          let date=new Date(response.data[i].date);
                          response.data[i].date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                        
                          this.$store.commit('SETOPPOINTMENT',response.data[i]);
                       
                        }
                       
                       },(reject)=>{
                           console.log('get fail')
                       })
           api.GetBalance({
            
                        login_id: this.$store.state.userid
                    }).then((response)=>{ 
                      this.$store.commit('SETUSERBALANCE',response.data[0].balance);
                        console.log(this.$store.balance);
                       },(reject)=>{
                           console.log('get fail')
                       })
    },
    methods: {
     
     
    
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
