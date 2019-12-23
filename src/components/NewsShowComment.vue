<template>
    <el-row class="cms-comments-box">
        <el-col :span="24" v-if="Comments.length == 0">
            <div class="cms-no-comment cms-not-copy">
                <span class="cms-no-comment-info">来成为第一个评论者吧~</span>
                <i class="cms-icon-thumb el-icon-thumb animated bounce"></i>
            </div>
        </el-col>
        <el-col v-else>
            这是评论列表
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "NewsShowComment",
        props:{
            Comments:{
                type:Array
            }
        }
    }
</script>

<style scoped>
    .cms-comments-box{
        padding: 1rem;
    }

    .cms-no-comment{
        position: relative;
        height: 2rem;
        text-align: center;
    }

    .cms-no-comment-info{
        font-size: 0.9rem;
        color: #999999;
    }

    .cms-icon-thumb{
        transition: 0.5s;
        position: absolute;
        right: 2rem;
        font-size: 1.6rem;
        top: -1rem;
        opacity: 0;
        color: #409eff;
        animation: thumb-move 0.5s linear 1.5s infinite alternate;
        /* Firefox: */
        -moz-animation: thumb-move 0.5s linear 1.5s infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: thumb-move 0.5s linear 1.5s infinite alternate;
        /* Opera: */
        -o-animation: thumb-move 0.5s linear 1.5s infinite alternate;
    }

    .cms-no-comment:hover .cms-icon-thumb{
        transition: 0.5s;
        opacity: 1;
    }

    @keyframes thumb-move
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }

    @-moz-keyframes thumb-move /* Firefox */
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }

    @-webkit-keyframes thumb-move /* Safari 和 Chrome */
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }

    @-o-keyframes thumb-move /* Opera */
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }
</style>
