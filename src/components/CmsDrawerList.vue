<template>
    <!--    抽屉式列表-->
    <div class="cms-drawer">
        <el-select class="cms-input-placeholder" value="" placeholder="学习资源与管理平台" @change="selectOption">
            <el-option v-for="(item,index) in ListData" :key="index" :label="item.title" :value="index"></el-option>
        </el-select>
        <el-drawer
                :visible.sync="drawer"
                :direction="direction"
                :size="drawerWidth"
                :before-close="handleClose" style="overflow-y:scroll;">
            <el-col :span="22" :offset="1">
                <cms-other-link-list :list-data="ListData[value]"
                                     :show-nmuber-in-line="1"></cms-other-link-list>
            </el-col>
        </el-drawer>
    </div>
</template>

<script>
    import {Drawer,Select,Option} from 'element-ui'
    import CmsOtherLinkList from "../components/CmsOtherLinkList";//学习资源和管理平台的组件
    export default {
        name: "CmsDrawerList",
        components: {
            [Drawer.name]: Drawer,
            [Select.name]:Select,
            [Option.name]:Option,
            CmsOtherLinkList
        },
        props: {
            ListData: {
                type: Array
            },
            ListTitle: {
                type: String
            }
        },
        data() {
            return {
                value:'',
                drawer: false,
                direction: 'ltr',
                drawerWidth:"30%",
                showNumberInLine2:1,
            };
        },
        methods: {
            handleClose(done) {
                done();
            },
            selectOption(e){
                this.drawer = true;
                this.value =e;
            }
        },
        mounted() {
            let width = window.screen.width;
            if(width < 768){
                this.showNumberInLine2 = 1;
                this.drawerWidth="90%";
            }else if(width < 1366){
                this.showNumberInLine2 = 1;
                this.drawerWidth="50%";
            }else if(width < 1920){
                this.showNumberInLine2 = 2;
                this.drawerWidth="25%";
            }else{
                this.showNumberInLine2 = 2;
                this.drawerWidth="20%";
            }
        }
    }
</script>

<style scoped>
    .cms-drawer {
        float: left;
        padding: 0.2rem;
        margin: 0.2rem;
        border-radius: 10px;
        color: #e0e0e0;
    }
</style>