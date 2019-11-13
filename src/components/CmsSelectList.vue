<template>
    <div class="cms-drawer">
        <el-select class="cms-input-placeholder" value="" :placeholder="ListTitle" @change="ToUrl">
            <el-option v-for="(item,index) in ListData" :key="index" :label="item.title" :value="item.url">
                <img class="cms-option-img" :src="item.src"/>
                <span>{{item.title}}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import {Drawer,Select,Option} from 'element-ui'
    export default {
        name: "CmsSelectList",
        components: {
            [Drawer.name]: Drawer,
            [Select.name]:Select,
            [Option.name]:Option,
        },
        props: {
            ListData: {
                type: Array
            },
            ListTitle: {
                type: String
            }
        },
        methods:{
            ToUrl(url){
                window.open(url,"_blank")
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

    .cms-option-img{
        position: relative;
        top:3px;
        margin-right: 0.5rem;
        height: 1rem;
        width: 1rem;
    }
</style>