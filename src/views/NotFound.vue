<template>
    <el-row>
        <el-col :span="24" class="cms-not-found-box">
            <el-col :lg="{span:6,offset:9}" :md="{span:8,offset:8}" :sm="{span:10,offset:7}" :xs="{span:18,offset:3}">
                <img src="../assets/images/404.png" class="cms-not-found-img">
                <div class="cms-not-found-title">页面可能被外星人绑走了~</div>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>
    .cms-not-found-box{
        margin-top: 1rem;
        padding: 2rem 0;
        background-color: #f9f9f9;
        height: 450px;
    }

    .cms-not-found-img{
        width: 100%;
        height: auto;
    }

    .cms-not-found-title{
        padding: 0.5rem 0;
        text-align: center;
        font-size: 1rem;
        color: #7A7A7A;
    }
</style>