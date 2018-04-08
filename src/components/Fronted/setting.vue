<template>
  <div class="setting-wrap">
    <el-container class="title">
      <el-header style="padding:0">
        <div class="header-title">
          <i class="el-icon-back back" @click="goBack">返回</i>
          <span>博客后台管理</span> <sup style="color:#fff"> - Powered By Jacky</sup>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu background-color="#545c64" router :default-active="$route.path" active-text-color="#ffd04b" text-color="#fff">
            <el-menu-item index="/setting/information">
              个人信息
            </el-menu-item>
            <el-menu-item index="/setting/message">
              评论消息
            </el-menu-item>
            <el-menu-item index="/setting/postlist">
              文章管理
            </el-menu-item>
            <el-menu-item index="/setting/board">
              留言板
            </el-menu-item>
            <el-menu-item index="/setting/type">
              分类管理
            </el-menu-item>
            <el-menu-item index="/setting/links">
              链接管理
            </el-menu-item>
            <el-menu-item index="/setting/trash">
              回收站
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div style="padding-left:200px">
          <el-card>
            <router-view/>
          </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.push('/index');
    }
  }
};
</script>
<style scoped>

.header-title {
  width: 100%;
  height: 60px;
  background-color: #009a61;
  position:relative;
}
.back{
  cursor: pointer;
  margin-left: 20px;
}
.header-title span{
  font-size: 1.4em;
  height: 60px;
  line-height: 60px;
  display: inline-block;
  color: #ffffff;
  margin:0 0 0 130px;
}
.aside{
  position: fixed;
  background-color: #545c64;
  height: 100%;
  top:60px;
  bottom:0;
}
</style>
