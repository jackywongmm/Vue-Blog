<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="name" label="昵称">
      </el-table-column>
      <el-table-column prop="email" label="联系邮箱">
      </el-table-column>
      <el-table-column prop="title" label="源文章">
      </el-table-column>
      <el-table-column prop="createTime" label="时间">
      </el-table-column>
      <el-table-column prop="comment" label="评论内容">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData:[]
    }
  },
  methods: {
    getData(){
      this.$axiosPost({
        url:'api/Admins/query_comment',
        resolve:res=>{
          this.tableData=res.data
        }
      })
    },
    handleClick(row){
      this.$axiosPost({
        url:'api/Admins/delete_comment',
        params:{
          id:row.id
        },
        resolve:res=>{
          if(res.status==1){
            this.$message({
              message:res.point,
              type:'success'
            })
            this.getData()
          }else{
            this.$message({
              message:res.point,
              type:'warning'
            })
          }
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style scoped>

</style>