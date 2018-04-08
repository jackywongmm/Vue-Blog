<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
  background-color: #fafafa
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  margin: 0;
}
a:link{
    text-decoration:none;
    color:#000;
     /* 指正常的未被访问过的链接*/
}
a:visited{
    text-decoration:none;
    color:#000;
     /*指已经访问过的链接*/
}a:hover{
     text-decoration:none;
     color:#000;
     /*指鼠标在链接*/
}
a:active{
    text-decoration:none;
    color:#000;
    /* 指正在点的链接*/
}


/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: rgb(242,242,242);
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: rgb(242,242,242);
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

</style>
