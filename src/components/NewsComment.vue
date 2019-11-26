<template>
    <el-drawer modal size="auto"
               :visible.sync="ShowDrawer"
               :direction="direction"
               :before-close="handleClose">
        <div slot="title" class="cms-comment-drawer-title">{{Title}}</div>
        <div class="cms-comment-drawer-main">
            <el-col :span="24" class="cms-flex-box cms-margin-small">
                <el-col :xl="12" :lg="14" :md="18" :sm="20" :xs="22">
                    <el-input
                            class="cms-comment-input"
                            type="textarea"
                            :autosize="{minRows:4}"
                            :maxlength="maxlength"
                            show-word-limit
                            :placeholder="Placeholder"
                            v-model="content"
                            resize="none">
                    </el-input>
                </el-col>
            </el-col>
            <el-col :span="24" class="cms-flex-box cms-margin-small">
                <el-col class="flex-end" :xl="12" :lg="14" :md="18" :sm="20" :xs="22">
                    <el-button type="primary" @click="resetContent">清空内容</el-button>
                    <el-button type="success" @click="submitContent">提交评论</el-button>
                </el-col>
            </el-col>
        </div>
    </el-drawer>
</template>

<script>
    import {Button, Drawer, Input} from "element-ui";

    export default {
        name: "NewsComment",
        props: {
            ShowDrawer: {//是否显示抽屉
                type: Boolean,
                default: false
            },
            Title: {//标题，默认是评论
                type: String,
                default: "评论",
            },
            Placeholder: {//placeholder内容，默认是评论
                type: String,
                default: "请输入评论内容",
            }
        },
        components: {
            [Button.name]: Button,
            [Drawer.name]: Drawer,
            [Input.name]: Input
        },
        data() {
            return {
                direction: 'btt',
                maxlength: 300,//最多字数
                content: '',//内容
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('是否要取消评论？')
                    .then(_ => {
                        done();
                        this.content = "";
                        //
                        this.$emit("cancelSubmitContent");
                    })
                    .catch(_ => {
                    });
            },
            resetContent() {
                this.content = "";
            },
            submitContent() {
                this.$emit("submitContent", this.content);
            },
        }
    }
</script>

<style scoped>
    .cms-comment-drawer-title {
        text-align: center;
        font-size: 1.3rem;
    }

    .cms-comment-drawer-main {
        height: 100%;
        padding: 1rem 0 2rem 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .cms-margin-small {
        margin: 0.5rem 0;
    }

    .cms-flex-box {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .cms-flex-end {
        justify-content: flex-end;
    }

    .cms-comment-box {
        height: 80%;
    }

    .cms-comment-input {
        max-height: 100%;
        font-size: 1rem;
        text-align: justify;
    }
</style>
