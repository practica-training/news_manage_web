import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {Get,Post} from './utils/http'
import VueAxios from 'vue-axios'
//引入axios
Vue.use(VueAxios, axios);

//全局引用包装的axios
Vue.prototype.$Post=Post;
Vue.prototype.$Get=Get;

//打印插件
import Print from 'vue-print-nb';
Vue.use(Print);

//图片预览插件
import ImageViewer from 'imageViewer';
Vue.use(ImageViewer);

// import vuePicturePreview from 'vue-picture-preview'
// Vue.use(vuePicturePreview)
// import VuePreview from 'vue-pic-preview'
// Vue.use(VuePreview);

// import VuePreview from 'vue-preview'
// Vue.use(VuePreview);

// import gallery from 'img-vuer'
// Vue.use(gallery, {
//     swipeThreshold: 150, // default 100
//     isIndexShow: true, // show image index, default true
//     useCloseButton: true, // trigger gallery close with close button, default true
//     preload: true, // preload images in the same group, default true
// })

//引入Element UI组件（按需引入）
import {
    Button,      //按钮组件
    ButtonGroup,
    Table,       //table组件
    TableColumn,
    Popover,     //弹出框组件（比如主页的日期）
    Tag,         //标签组件
    Icon,        //图标组件
    Row,         //行组件
    Col,         //列组件
    Card,        //卡片组件
    Loading,     //加载组件
    Notification,//通知组件
    Message,     //消息组件
} from 'element-ui';

//引入组件,设为全局,其他组件则按需引入
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;            //将加载组件挂载到Vue实例上
Vue.prototype.$notify = Notification;                //将通知组件挂载到Vue实例上
Vue.prototype.$message = Message;                    //将消息组件挂载到Vue实例上

import 'element-ui/lib/theme-chalk/index.css';       //基础的样式
import 'element-ui/lib/theme-chalk/display.css';     //隐藏类，比如xs时隐藏
import CmsInterface from '@/components/CmsInterface' //引入全局接口API
Vue.prototype.$cmsInterface = CmsInterface;          //将全局接口API挂载到Vue实例上
Vue.config.productionTip = false;                    //阻止显示生产模式的消息

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
