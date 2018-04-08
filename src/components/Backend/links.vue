<template>
  <div>
    <el-button @click="openadd">新增链接</el-button>
    <el-table :data="tableData">
      <el-table-column  prop="name" label="链接名">
      </el-table-column>
      <el-table-column  prop="url" label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog :visible.sync="modalAdd" width="20%">
      <el-form inline>
        <el-form-item label="链接名" label-width="60px">
          <el-input type="text" v-model="addinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="60px">
          <el-input type="text" v-model="addinfo.url"></el-input>
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
        name:'',
        url:''
      },
      tableData:[
      ]
    }
  },
  methods: {
    openadd(){
      this.modalAdd=true
    },
    getinformation(){
      this.$axiosPost({
        url:'api/Index/queryLink',
        resolve:res=>{
          if(res.status==1){
            this.tableData=res.data
          }
        }
      })
    },
    saveAdd(){
      this.$axiosPost({
        url:'api/Admins/add_link',
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
        url:'api/Admins/delete_link',
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
              message:'操作失败',
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
}
</script>
<style scoped>

</style>