<template>
    <el-drawer
            :title="DrawerTitle"
            :visible="IsShow"
            direction="btt"
            size="100%"
            custom-class="cms-user-drawer" @close="closeEditNews">

    </el-drawer>
</template>

<script>
    import {Drawer} from "element-ui"
    export default {
        name: "EditNews",
        props:{
            IsShow:{
                type:Boolean,
                default: false
            },
            DrawerTitle:{
                type:String,
                default:"新建新闻"
            }
        },
        components:{
            [Drawer.name]:Drawer
        },methods:{
            closeEditNews(){
                this.$emit("closeEditNews");
            }
        }
    }
</script>

<style scoped>

</style>
