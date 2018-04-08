<template>
  <div class="contact-wrap">
    <fonted-header/>
    <div class="content">
      <img src="../../assets/timg.jpg" alt="">
      <div class="item">
        <el-form :model="message" :rules="rules" ref="ruleform">
          <el-form-item>
            <el-row :gutter="40" >
              <el-col :span="12">
                <el-form-item  prop="name">
                  <el-input v-model="message.name" placeholder="Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="email">
                  <el-input v-model="message.email" placeholder="Emali"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:40px">
              <el-col :span="24">
                <el-form-item prop="comment">
                  <el-input type="textarea" v-model="message.comment" :autosize="{ minRows: 5, maxRows: 8}" placeholder="Message">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <el-button type="danger" @click="addMessage">给他留言</el-button>
      </div>
      <div class="item">
        <h2>Information</h2>
        <ul>
          <li v-for="item in information">{{item.key}}:{{item.value}}</li>
        </ul>
      </div>
    </div>
    <fonted-footer/>
  </div>

</template>
<script>
import fontedHeader from "@/components/Common/header";
import fontedFooter from "@/components/Common/footer";
export default {
  components: {
    fontedHeader,
    fontedFooter
  },
  data() {
    return {
      information:[],
      message: {
        name: "",
        email: "",
        comment: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入至少两位",
            trigger: "blur"
          },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        comment: [
          {
            required: true,
            message: "请输入留言内容",
            trigger: "blur"
          },
          {
            min: 2,
            max: 100,
            message: "请填写多一点哟",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getData(){
      this.$axiosPost({
        url:'api/Admins/query_message',
        resolve:res=>{
          if(res.status==1){
            this.information=res.data
          }else{
            this.$message({
              message:'获取个人信息出错啦-_-！'
            })
          }
        }
      })
    },
    addMessage(){
      this.$refs['ruleform'].validate((valid)=>{
        if(valid){
          this.$axiosPost({
            url:'api/Index/leaving_message',
            params:this.message,
            resolve:res=>{
              if(res.status==1){
                this.$message({
                  message:'感谢你的留言,2S后返回主页。',
                  type:'success'
                })
                setTimeout(()=>{
                  this.$router.push('index')
                },2000)
              }else{
                this.$message({
                  message:res.point,
                  type:"warning"
                })
              }        
            }
          })
        }
      })
    }
  },
  created () {
    this.getData()
  }
};
</script>
<style scoped>
.content {
  width: 80%;
  overflow: auto;
  margin: 0 auto;
}
.content img {
  display: block;
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.item {
  box-sizing: border-box;
  width: 49%;
  margin: 60px 0;
  padding: 0 60px;

  float: left;
}
.item:nth-of-type(1) {
  border-right: 2px solid #ffd04b;
}
.item ul li {
  display: block;
}
</style>
