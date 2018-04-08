import axios from "axios";
import { Message } from "element-ui";
import router from '@/router';
// import { error } from "util";

//const baseUrl = 'http://localhost:90/';

//打包后本地服务器
const baseUrl = '/index.php';

const Axios = axios.create({
  timeout: 10000,
  responseType: "json",
})



export default {
  install(Vue, option) {
    function Config() {
      return {
        url: '',
        params: {},
        resolve: () => { }
      }
    };

    Vue.prototype.$axiosPost = (_config) => {
      let _this = Vue.prototype
      let $config = new Config()
      let config = Object.assign($config, _config)

      //添加Token和sort
      config.params.token = sessionStorage.getItem('token') != null ? JSON.parse(sessionStorage.getItem('token')).token : '';
      config.params.sort = sessionStorage.getItem('token') != null ? JSON.parse(sessionStorage.getItem('token')).sort : '';

      Axios.post(baseUrl + config.url, { param: config.params }).then((res) => {
        if (res.status == 200) {
          if (res.data.status == -1) {
            router.push({ path: '/index' })
            _this.$message({
              message: '请重新登录管理员账号！',
              type: 'error'
            })
          } else {
            config.resolve(res.data)
          }
        } else {
          _this.$message({
            message: '网络出错了!',
            type: error
          })
        }
      })
    }
  }
}
    // Axios.interceptors.response.use(
    //   res => {
    //     if (res.data.status == 0) {
    //       Message({
    //         message: res.data,
    //         type: "warning"
    //       })
    //     } else if (res.data.status ==-1) {
    //       router.push({ path: '/index' })
    //     }
    //   },
    //   error => {
    //     Message({
    //       message: '网络出错了',
    //       type: 'error'
    //     });
    //     return Promise.reject(error)
    //   }
    // )