<template>
  <div>
    <el-button @click="modalAdd=true">新增分类</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="Id">
      </el-table-column>
      <el-table-column prop="name" label="类名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="modalAdd" title="新增类名" width="20%">
      <el-form inline>
        <el-form-item label="类名" label-width="60px">
          <el-input type="text" v-model="addinfo.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAdd">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modalAdd:false,
      addinfo:{
        name:''
      },
      tableData:[]
    }
  },
  methods:{
    getData(){
      this.$axiosPost({
        url:'api/Index/queryClassification',
        resolve:res=>{
          this.tableData=res.data
        }
      })
    },
    handleClick(row){
      this.$axiosPost({
        url:'api/Admins/delete_classification',
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
    },
    saveAdd(){
      this.$axiosPost({
        url:'api/Admins/add_classification',
        params:this.addinfo,
        resolve:(res)=>{
          if(res.status==1){
            this.modalAdd=false
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