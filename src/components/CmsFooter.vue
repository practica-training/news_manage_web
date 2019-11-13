<template>
    <!--    页脚组件-->
<!--    :class="{'cms-footer-position':HasScroll}"-->
    <el-row v-show="IsShow" v-cloak class="cms-footer">
        <el-col :sm="24" :md="6" class="cms-footer-img-box">
            <img src="../static/images/logo/dgutlogo.png"/>
        </el-col>
        <el-col :sm="24" :md="8" class="cms-footer-box">
            <template v-if="CmsConfig">
                <div class="cms-footer-tap">{{CmsConfig.footer}}</div>
            </template>
            <template v-else>
                <div class="cms-footer-tap">版权所有&nbsp;&copy;东莞理工学院网络空间安全学院</div>
            </template>
            <div class="cms-footer-tap">
                <span class="cms-footer-tap cms-view-num">粤ICP备05008829号</span>
                <span class="cms-footer-tap cms-view-num" style="position: relative;top: -1px;">浏览量:{{CmsConfig.pv}}</span>
            </div>

        </el-col>
        <el-col :sm="24" :md="6" class="cms-footer-box">
            <div class="cms-footer-tap"> 地址:东莞市松山湖大学路1号东莞理工学院9号楼</div>
            <div class="cms-footer-tap">
                <span class="cms-footer-tap cms-view-num">邮编：523808</span>
                <span @click="toOldWeb" class="cms-footer-tap cms-view-num" style="position: relative;top: -1px;cursor: pointer;">旧版官网</span>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "CmsFooter",
        props:{
            CmsConfig:{    //网站配置
                type:Object,
            },
            HasScroll:{ //是否有滚动条
                type:Boolean,
            },
            IsShow:{   //是否显示
                type:Boolean,
            }
        },
        watch:{
            HasScroll(){

            }
        },
        methods:{
            toOldWeb(){
                window.open("https://secs.dgut.edu.cn","_self");
            }
        }
    }
</script>

<style scoped>
    .cms-footer {
        display: flex;
        padding: 0.5rem 1rem;
        width: 100%;
        justify-content: space-around;
        flex-flow: wrap;
        background-image: url(../static/images/footer.png);
        background-repeat: no-repeat;
        background-color: #003674;
    }

    .cms-footer-position{
        position: absolute;
        bottom: 0;
    }

    .cms-footer-img-box{
        padding-top: 1rem;
    }

    .cms-footer-box{
        padding-top: 0.5rem;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
    }

    .cms-footer-tap{
        font-size: 0.9rem;
        color: #f0f0f0;
    }


    .cms-footer-tap>a {
        color: #F0f0f0;
    }

    .cms-footer-tap-href {
        float: left;
    }

    .cms-footer-tap-separator {
        float: left;
        font-size: 0.9rem;
        margin: 0 3px;
    }

    .cms-view-num{
        margin-right: 1rem;
    }

    @media screen and (max-width: 992px){
        .cms-view-num{
            display: block;
            width: 100%;
        }
    }
</style>