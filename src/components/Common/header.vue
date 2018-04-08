<template>
  <div class="fonted-header-wrap">
    <el-row>
      <el-col :span="3">
        <div style="background-color:#545c64;height:60px">
        </div>
      </el-col>
      <el-col :span="21">
        <el-menu mode="horizontal" router :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>首页</el-menu-item>
          <el-menu-item index='' @click="loginModal">
            <i class="el-icon-setting"></i> 管理</el-menu-item>
          <el-menu-item index="/contact">
            <i class="el-icon-star-on"></i> 联系我</el-menu-item>
        </el-menu>
      </el-col>
      
    </el-row>
    <el-dialog title="管理员登录" :visible.sync="modalLogin" width="20%" >
      <el-form>
        <el-form-item label="账号" label-width="60px">
          <el-input type="text" autofocus  v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="60px">
          <el-input type="password" v-model="loginData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modalLogin:false,
      param:'',
      loginData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    loginModal() {
      if(!sessionStorage.getItem('token')){
        this.modalLogin=true;
      }else{
        this.$router.push('/setting')
      }
    },
    login(){
      this.$axiosPost({
        url:'api/Login/login',
        params:this.loginData,
        resolve:(res)=>{
          if(res.status==1){
            sessionStorage.setItem('token',JSON.stringify({"token":res.data.token,"sort":res.data.sort}));
            this.$message({
              message:res.point,
              type:'success'
            })
            setTimeout(()=>{
              this.$router.push('setting')
            },1000)
          }else{
            this.$message({
              message:res.point,
              type:'warning'
            })
          }
        }
      })
    }
  }
};
</script>
<style scoped>

</style>