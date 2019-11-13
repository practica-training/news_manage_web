<template>
    <div class="cms-side-box cms-not-copy">
        <el-popover trigger="click" placement="left" @after-enter="whenShowCode">
<!--            微信公众号二维码-->
            <div class="cms-two-code-pic">
                <img src="../static/images/wechat_public.png"/>
                <span class="cms-not-copy">关注学院官方公众号</span>
            </div>
<!--            微信公众号图标-->
            <div slot="reference" class="cms-side-item">
                <img src="../static/images/logo/wechat.png"/>
            </div>
        </el-popover>

<!--        <el-popover trigger="click" placement="left">-->
<!--            &lt;!&ndash;            微信公众号二维码&ndash;&gt;-->
<!--            <div class="cms-two-code-pic">-->
<!--                <img src="../static/images/wechat_public.png"/>-->
<!--            </div>-->
<!--            &lt;!&ndash;            微信小程序图标&ndash;&gt;-->
<!--            <div slot="reference" class="cms-side-item">-->
<!--                <img src="../static/images/logo/wechatxcx.png"/>-->
<!--            </div>-->
<!--        </el-popover>-->
    </div>
</template>

<script>
    export default {
        name: "CmsSideBox",
        methods:{
            //当显示二维码的时候，判断是否是微信浏览器,如果是，则直接跳转到公众号页面
            whenShowCode(){
                //如果是微信浏览器，则跳转
                if(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1){
                    window.open("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MzQ3MzA1NQ==&scene=124#wechat_redirect","_self");
                }
            },
        }
    }
</script>

<style scoped>
    .cms-side-box{
        display: flex;
        position: fixed;
        right: 1rem;
        top: 20rem;
        bottom: 20rem;
        padding: 1px;
        z-index: 999;
        justify-content: center;
        flex-flow: column;
        opacity: 0.2;
    }

    .cms-side-box:hover{
        transition: 0.5s;
        opacity: 1;
    }

    .cms-side-item{
        width: 3rem;
        height: 3rem;
        margin: 0.2rem;
        border-radius: 50%;
        cursor: pointer;
    }

    .cms-side-item:hover{
        transition: 0.5s;
        box-shadow: 0 0 10px #999999;
    }

    .cms-side-item>img{
        height: 100%;
        width: 100%;
    }

    .cms-two-code-pic{
        width: 9rem;
        height: 10rem;
        padding-bottom: 0.5rem;
        margin: 0 auto;
        text-align: center;
        font-size: 0.9rem;
    }

    .cms-two-code-pic>img{
        width: 100%;
        height: auto;
    }
</style>