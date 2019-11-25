<template>
    <div>
        <el-button @click="drawer = true" type="default" style="margin-left: 16px;">
            评论
        </el-button>
        <el-drawer modal size="60%"
                title="评论"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose">
            <span>来评论吧!</span>
        </el-drawer>
    </div>
</template>

<script>
    import {Button, Drawer} from "element-ui";

    export default {
        name: "NewsComment",
        components: {
            [Button.name]: Button,
            [Drawer.name]: Drawer
        },
        data() {
            return {
                drawer: false,
                direction: 'btt',
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('是否要取消评论？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>

</style>
