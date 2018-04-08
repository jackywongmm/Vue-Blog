<template>
  <div>
    <el-button @click="addBlog">发表新文章</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="编号">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="name" label="作者">
      </el-table-column>
      <el-table-column prop="createTime" label="发表时间">
      </el-table-column>
      <el-table-column prop="type" label="分类">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="Update(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="Delete(scope.row)" type="text" size="small">删除到回收站</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="modify?'文章编辑':'发布新文章'" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="article.name"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select placeholder="请选择分类" v-model="article.fid">
            <el-option v-for="item in type" :label="item.name" :key="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="article.abstract" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <wang-editor v-if="dialogVisible" :editor-content='article.content' v-on:post=getPost></wang-editor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!modify" type="primary" @click="saveAdd">发布</el-button>
        <el-button v-if="modify" type="primary" @click="saveModify">保存更改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import wangEditor from "@/components/Common/wangEditor"
export default {
  components: {
    wangEditor
  },
  data() {
    return {
      dialogVisible: false,
      modify:false,
      type: [],
      article: {
        title: "",
        name: "",
        fid: "",
        abstract:"",
        content: ""
      },
      tableData: []
    };
  },
  methods: {
    getPost(html){
      this.article.content=html;
    },
    getData() {
      this.$axiosPost({
        url: "api/Admins/query_article",
        resolve: res => {
          if (res.status == 1) {
            this.tableData = res.data;
          }
        }
      });
    },
    getType() {
      this.$axiosPost({
        url: "api/Index/queryClassification",
        resolve: res => {
          this.type= res.data;
        }
      });
    },
    addBlog() {
      //模态框转为编辑状态
      this.modify=false
      //初始化this.article为空
      for (const key in this.article) {
        if (this.article.hasOwnProperty(key)) {
          this.article[key]=''     
        }
      }
      this.dialogVisible = true;
    },
    saveAdd(){
      this.$axiosPost({
        url:'api/Admins/release_article',
        params:this.article,
        resolve:(res)=>{
          if(res.status==1){
            this.getData();
            this.dialogVisible=false
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
    saveModify(){
      let params={};
      params.data=JSON.parse(JSON.stringify(this.article))
      debugger
      delete params.data.type;
      this.$axiosPost({
        url:'api/Admins/update_article',
        params:params,
        resolve:res=>{
          if(res.status==1){
            this.$message({
              message:res.point,
              type:'success'
            })
            this.saveModify=false
          }
        }
      })
    },
    Update(row){
      this.modify=true;
      Object.assign(this.article,row)
      this.dialogVisible=true;
    },
    Delete(row){
      this.$axiosPost({
        url: "api/Admins/delete_article",
        params:{
          id:row.id
        },
        resolve: res => {
          if (res.status == 1) {
            this.getData()
            this.$message({
              message:res.point,
              type:'success'
            })
          }
        }
      });
    }
  },
  created() {
    this.getData();
    this.getType()
  },
  mounted () {
    this.$nextTick(()=>{

    })
  }
};
</script>
<style scoped>

</style>