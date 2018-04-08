<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "editor",
  props:['editorContent'],//编辑器初始化内容，由父组件传递
  data() {
    return {
      //EditorContent:this.editorContent
    };
  },
  methods: {
    postContent(html) {
      this.$emit("post", html);
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.postContent(html);
    };
    editor.customConfig.onblur = (html)=>{
      this.postContent(html);
    };
    editor.create();
    editor.txt.html(this.editorContent)
  }
};
</script>
<style scoped>

</style>
