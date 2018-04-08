<template>
  <div>
    <el-button type="primary" @click="openadd">增加个人信息</el-button>
    <el-table :data="tableData">
      <el-table-column prop="key" label="信息名称">
      </el-table-column>
      <el-table-column prop="value" label="描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="modalAdd" width="20%">
      <el-form inline>
        <el-form-item label="属性" label-width="60px">
          <el-input type="text" v-model="addinfo.key"></el-input>
        </el-form-item>
        <el-form-item label="信息" label-width="60px">
          <el-input type="text" v-model="addinfo.value"></el-input>
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
  data() {
    return {
      modalAdd:false,
      addinfo:{
        key:'',
        value:''
      },
      tableData: []
    };
  },
  methods: {
    openadd(){
      this.modalAdd=true
    },
    getinformation(){
      this.$axiosPost({
        url:'api/Admins/query_message',
        resolve:res=>{
          if(res.status==1){
            this.tableData=res.data
          }
        }
      })
    },
    saveAdd(){
      this.$axiosPost({
        url:'api/Admins/add_message',
        params:this.addinfo,
        resolve:(res)=>{
          if(res.status==1){
            this.modalAdd=false
            this.tableData.push(JSON.parse(JSON.stringify(this.addinfo)))
            this.$message({
              message:res.point,
              type:'success'
            })
          }else{
            this.$message({
              message:res.point,
              type:'warning'
            })
          }
        }
      })
    },
    handleClick(row){
      this.$axiosPost({
        url:'api/Admins/delete_message',
        params:{
          id:row.id
        },
        resolve:res=>{
          if(res.status==1){
            this.$message({
              message:res.point,
              type:'success'
            })
            this.getinformation()
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
  created(){
    this.getinformation()
  }
};
</script>
<style scoped>

</style>
