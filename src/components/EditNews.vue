<template>
    <el-drawer
            :title="DrawerTitle"
            :visible="IsShow"
            direction="btt"
            size="100%"
            custom-class="cms-edit-news-drawer" @close="closeEditNews">
        <el-col :span="20" :offset="2">
            <el-form label-position="right" :label-width="'150px'">
                <el-form-item label="标题">
                    <el-input v-model="newsTitle" placeholder="请输入新闻标题"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                            action="#"
                            list-type="picture-card"
                            :auto-upload="false"
                            :limit="1"
                            accept="image/jpeg,image/png,image/jpg"
                            :multiple="false"
                            :on-change="changeImage"
                            :file-list="fileList"
                            ref="uploadNewsAvatarComponent"
                    >
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file">
                            <img class="el-upload-list__item-thumbnail"
                                 :src="newsAvatar.url && newsAvatar.url.indexOf('blob') != -1 ? newsAvatar.url : baseUrl + newsAvatar.url"
                                 :alt="newsAvatar.name">
                            <span class="el-upload-list__item-actions">
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove">
                      <i class="el-icon-delete"></i>
                    </span>
                </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="类别">
                    <el-checkbox-group v-model="newsTypes" size="small" @change="changeNewsType">
                        <template v-for="item in newsAllTypes">
                            <el-checkbox :key="item.id" :label="item.id" :value="item.id" :name="item.id" border>
                                {{item.name}}
                            </el-checkbox>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="内容">
                    <quill-editor
                            v-model="content"
                            ref="newsEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>
                <div style="height: 5rem"></div>
                <div class="cms-edit-news-operation-box">
                    <el-col class="cms-edit-news-operation" :span="16" :offset="5">
                        <el-button type="danger" round @click="cancel">取消</el-button>
                        <el-button type="success" round @click="saveNews">保存草稿</el-button>
                    </el-col>
                </div>
            </el-form>
        </el-col>
    </el-drawer>
</template>

<script>
    import {Drawer, Upload, Dialog, Form, FormItem, Input, Button, CheckboxGroup, Checkbox} from "element-ui"
    import store from "../store"

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"], // 引用  代码块
        [{header: 1}, {header: 2}], // 1、2 级标题
        [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
        [{script: "sub"}, {script: "super"}], // 上标/下标
        [{indent: "-1"}, {indent: "+1"}], // 缩进
        // [{'direction': 'rtl'}],                         // 文本方向
        [{size: ["small", false, "large", "huge"]}], // 字体大小
        [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
        [{color: []}, {background: []}], // 字体颜色、字体背景颜色
        [{font: []}], // 字体种类
        [{align: []}], // 对齐方式
        ["clean"], // 清除文本格式
        ["link", "image"] // 链接、图片、视频
    ];

    export default {
        name: "EditNews",
        store,
        props: {
            IsShow: {
                type: Boolean,
                default: false
            },
            DrawerTitle: {
                type: String,
                default: "新建新闻"
            },
            News: {
                type: Object
            }
        },
        components: {
            [Drawer.name]: Drawer,
            [Upload.name]: Upload,
            [Dialog.name]: Dialog,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button,
            [CheckboxGroup.name]: CheckboxGroup,
            [Checkbox.name]: Checkbox
        },
        data() {
            return {
                baseUrl: this.$API.BaseUrl,
                newsTitle: "",
                newsAvatar: {},
                newsTypes: [],
                content: "",
                fileList: [],
                editorOption: {
                    theme: "snow", // or 'bubble'
                    placeholder: "请输入新闻正文",
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                        }
                    }
                },
                newsAllTypes: store.state.newsAllTypes,//新闻的所有类型
                disabled: false
            }
        },
        watch: {
            '$store.state.newsAllTypes'(newVal) {
                if (newVal) {
                    this.newsAllTypes = newVal;
                }
            },
            News(newVal) {
                if (newVal && newVal.newsId) {//如果有，则是编辑新闻
                    this.content = newVal.content;
                    this.newsTitle = newVal.newsTitle;
                    this.newsAvatar.url = newVal.newsAvatar;
                    this.newsTypes = newVal.newsTypeSet;
                    this.fileList.push({
                        name: "temp.png",
                        url: newVal.newsAvatar
                    })
                }
            }
        },
        methods: {
            onEditorBlur() {//失去焦点事件
            }
            ,
            onEditorFocus() {//获得焦点事件
            }
            ,
            onEditorChange() {//内容改变事件
            },
            closeEditNews() {
                this.$emit("closeEditNews");
            },
            //改变了新闻类型
            changeNewsType(e) {
                window.console.log(e);
                window.console.log(this.newsTypes)
            },
            //改变了封面图片
            changeImage(file) {
                if (file.status == "ready") {
                    if (file.raw.type != "image/jpg" && file.raw.type != "image/png" && file.raw.type != "image/jpeg") {
                        this.$message.error("请上传jpg/jpeg或者png格式的图片");
                        this.$refs.uploadNewsAvatarComponent.clearFiles();
                        return;
                    }
                    if (file.size / 1024 > 2048) {//大于2M
                        this.$message.error("上传图片大小不能超过2M");
                        this.$refs.uploadNewsAvatarComponent.clearFiles();
                        return;
                    }
                    this.newsAvatar = file;
                    let loading = this.$loading();
                    this.$API.uploadAvatar(file.raw).then(res => {
                        loading.close();
                        if (res.data.success) {
                            this.newsAvatar.url = "/upload/getImage?fileName=" + res.data.url;
                            window.console.log(this.newsAvatar)
                        }
                    }).catch(() => {
                        loading.close();
                    })
                }
            },
            handleRemove() {
                this.$refs.uploadNewsAvatarComponent.clearFiles();
            },
            //取消
            cancel() {
                this.newsTitle = "";
                this.newsAvatar = "";
                this.content = "";
                this.$refs.uploadNewsAvatarComponent.clearFiles();
                this.closeEditNews();
            },
            //保存新闻为草稿
            saveNews() {
                if (!this.newsTitle) {
                    this.$message.error("新闻标题不能为空");
                    return;
                }
                if (!this.newsAvatar) {
                    this.$message.error("请上传新闻封面图片");
                    return;
                }
                if (this.newsTypes.length == 0) {
                    this.$message.error("请至少选择一个新闻类别");
                    return;
                }
                if (!this.content) {
                    this.$message.error("新闻内容不能为空");
                    return;
                }
                window.console.log(this.News);
                let loading = this.$loading();
                if (this.News && this.News.newsId) {//是编辑新闻
                    this.$API.updateNews(this.News.newsId, this.newsTitle, this.newsAvatar.url, this.content).then(res => {
                        loading.close();
                        window.console.log(res);
                        this.$emit("updateNews", {
                            newsTitle: this.newsTitle,
                            newsAvatar: this.newsAvatar.url,
                            content: this.content
                        });
                    }).catch(() => {
                        loading.close();
                    })
                } else {
                    this.$API.addNews(this.newsTitle, this.newsAvatar.url, this.content).then(res => {
                        loading.close();
                        if (res.data.success) {
                            this.$message.success("保存成功");
                            this.$emit("updateNews", res.data.newsDTO);
                        } else {
                            this.$message.success("保存失败,请重试");
                        }
                    }).catch(() => {
                        loading.close();
                        this.$message.success("发生意外错误,保存失败");
                    });
                }
            }
        },
    }
</script>

<style scoped>
    .cms-edit-news-operation-box {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 1rem 0;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .cms-edit-news-operation {
        display: flex;
        justify-content: space-around;
    }
</style>
