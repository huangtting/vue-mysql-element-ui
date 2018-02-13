<template>
<div>
  <el-table
    :data="tableData5"
   
    
    border>
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
      prop="notice"
      width="240px">
    </el-table-column>

    <el-table-column
      label="日期"
      prop="date"
      width="120px">
    </el-table-column>

    <el-table-column
    >
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">删除该通知</el-button>
          </template>
    </el-table-column>
  </el-table>
</div>
  
</template>

<style>
  div{
    width: 50%;
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
  export default {
    data() {
      return {
        tableData5: [{
          notice:'这是一段测试',
          date:'10-8',
          content:'这是一段测试'
        }, {
          notice:'这是一段测试',
          date:'10-8',
          content:'这是一段测试'
        }, {
          notice:'这是一段测试',
          date:'10-8',
          content:'这是一段测试'
        }, {
          notice:'这是一段测试',
          date:'10-8',
          content:'这是一段测试'
        }]
      }
    }
  }
</script>