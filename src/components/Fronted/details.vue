<template>
  <div class="details-wrap">
    <fonted-header/>
    <div class="content">
      <el-card v-loading.fullscreen.lock="fullscreen">
        <h2 style="text-align:center">{{post.title}}</h2>
        <el-row>
          <el-col :span="5" :offset=1>
            文章类型：
            <el-tag size="small">{{post.classification}}</el-tag>
          </el-col>
          <el-col :span="3" :offset=10>
            作者：{{post.name}}
          </el-col>
          <el-col :span="5">
            发表于：{{post.createTime}}
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin-top:20px">
        <div class="detail-text" v-html="post.content">

        </div>
      </el-card>
      <el-card style="margin-top:20px">
        <el-row>
          <el-col :span="22">
            <h3>最新评论({{commentLength}})：</h3>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="addComent=true" icon="el-icon-edit">评论</el-button>
          </el-col>
        </el-row>
        <div class="comment-item" v-for="item in comment">
          <span>{{item.createTime}}</span>
          <p>{{item.name}}：{{item.comment}}</p>
        </div>
      </el-card>
    </div>
    <el-dialog title="评论" :visible.sync="addComent" width="30%">
      <div class="item">
        <el-form :model="message" :rules="rules" ref="ruleform">
          <el-form-item>
            <el-row :gutter="40">
              <el-col :span="12">
                <el-form-item prop="name">
                  <el-input v-model="message.name" placeholder="Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="email">
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
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveComment">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <fonted-footer/>
  </div>

</template>
<script>
import fontedHeader from "@/components/Common/header";
import fontedFooter from "@/components/Common/footer";
export default {
  components: { fontedHeader, fontedFooter },
  data() {
    return {
      fullscreen: true,
      addComent: false,
      message: {
        aid: this.$route.params.id,
        name: "",
        email: "",
        comment: ""
      },
      post: {},
      comment: [""],
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
    getData() {
      this.$axiosPost({
        url: "api/Index/allList",
        params: {
          id: this.$route.params.id
        },
        resolve: res => {
          if (res.status == 1) {
            this.post = res.data;
          }
        }
      });
    },
    getComment() {
      this.$axiosPost({
        url: "api/Index/queryComment",
        params: {
          aid: this.$route.params.id
        },
        resolve: res => {
          if (res.status == 1) {
            this.comment = res.data;
            this.fullscreen = false;
          }
        }
      });
    },
    saveComment() {
      this.$axiosPost({
        url: "api/Index/comment",
        params: this.message,
        resolve: res => {
          if (res.status == 1) {
            this.getComment();
            this.addComent = false;
            this.$message({
              message: "感谢你的评论",
              type: "success"
            });
          }
        }
      });
    }
  },
  computed: {
    commentLength() {
      return this.comment.length;
    }
  },
  created() {
    this.getData();
    this.getComment();
  }
};
</script>
<style scoped>
.content {
  width: 60%;
  margin: 0 auto;
  padding: 50px 40px;
}
.detail-text{
  padding: 20px 60px;
}
.comment-item {
  padding: 20px;
  border-bottom: 2px solid #dfdfdf;
}

</style>
