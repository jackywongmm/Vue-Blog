<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="文章ID">
      </el-table-column>
      <el-table-column prop="title" label="文章标题">
      </el-table-column>
      <el-table-column prop="deleteTime" label="删除时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="returnPost(scope.row)" type="text" size="small">还原</el-button>
          <el-button @click="deletePost(scope.row)" type="text" size="small">彻底删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getinformation() {
      this.$axiosPost({
        url: "api/Admins/query_article_update",
        resolve: res => {
          if (res.status == 1) {
            this.tableData = res.data;
          }
        }
      });
    },
    returnPost(row){
      this.$axiosPost({
        url:'api/Admins/return_article',
        params:{
          id:row.id
        },
        resolve:res=>{
          if(res.status==1){
            this.getinformation()
            this.$message({
              message:"该文章以还原，请到文章管理查看！",
              type:'success'
            })
          }
        }
      })
    },
    deletePost(row){
      this.$axiosPost({
        url:'api/Admins/delete_article_all',
        params:{
          id:row.id
        },
        resolve:res=>{
          if(res.status==1){
            this.getinformation()
            this.$message({
              message:'已从数据库删除！',
              type:'success'
            })
          }
        }
      })
    }
  },
  created () {
    this.getinformation()
  }
};
</script>
<style scoped>

</style>