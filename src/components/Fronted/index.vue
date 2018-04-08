<template>
  <div class="main-body">
    <fonted-header/>
    <div class="carousel">
      <div id="canvas">
      </div>
      <!-- <el-carousel indicator-position="outside" height="500px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img class="item" src="../../assets/timg.jpg" alt="">
        </el-carousel-item>
      </el-carousel> -->
    </div>
    <div class="content">
      <div class="left">
        <el-card v-loading.fullscreen.lock="fullscreen">
          <div style="height:60px">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="title" style="width:240px;margin:10px 10px 0 0px"></el-input>
            <el-button plain @click="search">搜索</el-button>
          </div>
          <h3>我的标签</h3>
          <div style="width:260px">
            <div v-for="item in tagList" class="tags" @click="getBytag(item.id)">
              <el-tag>{{item.name}}</el-tag>
            </div>
          </div>
          <h3>阅读排行</h3>
          <div class="readrank">
            <p v-for="(item,index) in rankList" v-if="index<6">
              <i class="el-icon-tickets mg-r-5">
                <router-link :to="{name:'details',params:{id:item.id}}">{{item.title}}</router-link>
              </i>
            </p>
          </div>
        </el-card>
        <el-card style="margin-top:20px">
          <h3>收藏链接</h3>
          <p v-for="item in linkList">
            <a :href="'http://'+item.url">{{item.name}}</a>
          </p>
        </el-card>
      </div>
      <div class="right">
        <el-card>
          <div class="post-item" v-for="(item,index) in postList" v-if="index<6" :key="item.id">
            <span class="time">{{item.createTime}}</span>
            <div style="float:right;margin-right:20px">
              <span style="font-size:0.8em;opacity:0.7">标签： </span>
              <el-tag size="small">{{item.classification}}</el-tag>
            </div>
            <router-link class="router-link" :to="{name:'details',params:{id:item.id}}">{{item.title}}</router-link>
            <p>
              <strong>摘要:</strong>
              <p class="post-content">{{item.abstract}}</p>
            </p>
            <div style="text-align:right">
              <el-badge :value=item.sum :max="99" class="mg-r-20">
                <el-button size="small">
                  <router-link :to="{name:'details',params:{id:item.id}}">评论</router-link>
                </el-button>
              </el-badge>
              <el-badge :value=item.reading :max="90" class="mg-r-20">
                <el-button size="small">
                  <router-link :to="{name:'details',params:{id:item.id}}">浏览</router-link>
                </el-button>
              </el-badge>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <fonted-footer/>
  </div>
</template>
<script>
import fontedHeader from "@/components/Common/header";
import fontedFooter from "@/components/Common/footer";
export default {
  name: "fonted-index",
  components: { fontedHeader, fontedFooter },
  data() {
    return {
      fullscreen: true,
      title:'',
      postList: [],
      tagList: [],
      rankList: [],
      linkList: []
    };
  },
  methods: {
    search(){
      this.$axiosPost({
        url: "api/Index/allList",
        params:{
          title:this.title
        },
        resolve: res => {
          if (res.status == 1) {
            this.postList = res.data;
          }
        }
      });
    },
    getPost() {
      this.$axiosPost({
        url: "api/Index/allList",
        resolve: res => {
          if (res.status == 1) {
            this.postList = res.data;
          }
        }
      });
    },
    getLInks() {
      this.$axiosPost({
        url: "api/Index/queryLink",
        resolve: res => {
          if (res.status == 1) {
            this.linkList = res.data;
            this.fullscreen = false;
            this.canvasInit();
          }
        }
      });
    },
    getTags() {
      this.$axiosPost({
        url: "api/Index/queryClassification",
        resolve: res => {
          if (res.status == 1) {
            this.tagList = res.data;
          }
        }
      });
    },
    getRank() {
      this.$axiosPost({
        url: "api/Index/queryRank",
        resolve: res => {
          if (res.status == 1) {
            this.rankList = res.data;
          } else {
            this.$message({
              message: "阅读排行查询失败",
              type: "warning"
            });
          }
        }
      });
    },
    getBytag(id) {
      this.$axiosPost({
        url: "api/Index/queryArticle",
        params: {
          fid: id
        },
        resolve: res => {
          if (res.status == 1) {
            this.postList = res.data;
          } else {
            this.$message({
              message: res.point,
              type: "warning"
            });
          }
        }
      });
    },
    canvasInit() {
      try {
        container = document.getElementById("canvas");
        container.appendChild(renderer.domElement);
      } catch (error) {}

      // Add the Renderer to the DOM, in the world div.
      // container = document.getElementById("canvas");
      // container.appendChild(renderer.domElement);
    }
  },
  created() {
    this.getPost();
    this.getTags();
    this.getRank();
    this.getLInks();
  },
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>
<style scoped>
.main-body {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}
.carousel {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.carousel .item {
  width: 100%;
  height: 100%;
}
.content {
  width: 80%;
  overflow: auto;
  margin: 0 auto;
}
.content .left {
  width: 34%;
  float: left;
  margin-right: 2%;
}
.content .left h3 {
  color: #ffd04b;
}
.tags {
  display: inline-block;
  margin: 0 10px 10px 0;
  cursor: pointer;
}
.content .right {
  width: 64%;
  float: left;
}
.mg-r-20 {
  margin-right: 20px;
}
.readrank p {
  display: block;
  padding: 10px 0 5px 15px;
  background-color: #ffffff;
  font-size: 1em;
  border-bottom: 1px solid #dfdfdf;
}
.mg-r-5 {
  margin-right: 5px;
}
.post-item {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.post-item .time {
  box-sizing: content-box;
  display: inline-block;
  float: left;
  width: 90px;
  opacity: 0.7;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0 5px;
  font-size: 0.7em;
  color: #ffffff;
  background-color: #ffd04b;
}
.post-content {
  text-indent: 2em;
  line-height: 1.5em;
  opacity: 0.7;
}
.router-link {
  display: inline-block;
  height: 30px;
  color: #545c64;
  font-size: 1.2em;
  line-height: 30px;
  margin-left: 30px;
}
.post-item p {
  font-size: 0.9em;
}
#canvas {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  overflow: hidden;
  background: linear-gradient(#e4e0ba, #f7d9aa);
}
</style>
