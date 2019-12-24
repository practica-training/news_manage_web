<template>
    <div class="user-info-box">
        <div class="user-info-tab">
            <div class="user-info-avatar-box">
                <img :src="BaseUrl + updateUserInfo.userAvatar" @click="clickAvatar">
            </div>
            <input type="file" id="uploadImg" style="display: none;" ref="uploadImg" accept=".png,.jpg,.jpeg" multiple="multiple" @change="uploadAvatar"/>
            <!--                预览大图的img-->
            <img id="preViewImg" @click="$imageViewer" style="display: none;" ref="preViewImg"/>
            <!--                预览大图的img-->
        </div>
        <div class="user-info-tab">
            <el-form class="cms-not-copy" label-position="right" :label-width="IsOtherUserInfo?'100px':'180px'" :model="updateUserInfo">
                <el-form-item v-if="!IsOtherUserInfo" label="用户名" class="user-info-title">
                    <div class="user-info-decision">{{UserInfo.userName}}</div>
                </el-form-item>
                <el-form-item label="昵称" class="user-info-title">
                    <div v-show="!isUpdate">
                        <div class="user-info-decision">{{UserInfo.userNickname}}</div>
                    </div>
                    <el-input v-show="isUpdate" v-model="updateUserInfo.userNickname" @change="validateUserNickname">
                        <span slot="suffix" :class="userNickNameSuffixIcon == 'el-icon-circle-check' ? 'validateSuccess' : 'validateFail'"><i :class="userNickNameSuffixIcon"></i></span>
                    </el-input>
                </el-form-item>
                <el-form-item label="性别" class="user-info-title">
                    <div v-show="!isUpdate">
                        <div class="user-info-decision">{{UserInfo.userSex == 0 ? '女' : '男'}}</div>
                    </div>
                    <el-select v-show="isUpdate" v-model="updateUserInfo.userSex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="!IsOtherUserInfo" label="手机" class="user-info-title">
                    <div v-if="UserInfo.userPhone">
                        <span class="user-info-decision">{{UserInfo.userPhone.slice(0,3)}}***{{UserInfo.userPhone.slice(UserInfo.userPhone.length-4,UserInfo.userPhone.length)}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button v-show="!isUpdate" type="warning" size="mini" round plain>
                            更换手机
                        </el-button>
                    </div>
                    <div v-else>
                        <el-button type="danger" size="mini">绑定手机</el-button>
                    </div>
                </el-form-item>
                <el-form-item v-if="!IsOtherUserInfo" label="密码" class="user-info-title">
                    <div v-show="!isUpdate">
                        <el-button type="primary" size="mini" round plain>修改密码</el-button>
                    </div>
                    <div v-show="isUpdate" class="user-info-decision">
                        ******
                    </div>
                </el-form-item>
                <el-form-item label="实名认证" class="user-info-title">
                    <div v-if="updateUserInfo.isCertified" class="user-info-decision">已认证</div>
                    <div v-else-if="!IsOtherUserInfo" class="user-info-decision">未认证&nbsp;&nbsp;<span
                            class="user-info-to-certified">去实名认证</span></div>
                    <div v-else class="user-info-decision">未认证</div>
                </el-form-item>
                <el-form-item label="注册时间" class="user-info-title">
                    <div class="user-info-decision">{{updateUserInfo.registrationTime}}</div>
                </el-form-item>
                <el-form-item label="违规次数" class="user-info-title">
                    <div class="user-info-decision">{{updateUserInfo.violationNumber}}</div>
                </el-form-item>
                <div v-if="!IsOtherUserInfo" class="cms-divide-line"></div>
                <el-form-item>
                </el-form-item>
                <el-form-item v-if="!IsOtherUserInfo">
                    <el-button v-show="!isUpdate" style="float: right;" plain round @click="isUpdate = true">修改资料
                    </el-button>
                    <el-button v-show="isUpdate" style="float: left;" type="primary" round @click="isUpdate = false">
                        取消修改
                    </el-button>
                    <el-button v-show="isUpdate" style="float: right;" type="success" round @click="isUpdate = false">
                        确认修改
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {Form, FormItem, Input, Button,Select,Option} from "element-ui"

    export default {
        name: "UserInfo",
        props: {
            BaseUrl: {
                type: String
            },
            UserInfo: {
                type: Object
            },
            IsOtherUserInfo: {//是否是查看别人的资料
                type: Boolean,
                default: false
            }
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button,
            [Select.name]:Select,
            [Option.name]:Option
        },
        data() {
            return {
                updateUserInfo: {},
                isUpdate: false,
                userNickNameSuffixIcon:"",
            }
        },
        methods: {
            clickAvatar() {//点击了头像
                if (this.IsOtherUserInfo) {//如果是查看别人的信息，点击头像则看大图
                    this.$refs.preViewImg.src = this.BaseUrl + this.UserInfo.userAvatar;
                    this.$refs.preViewImg.click();
                } else {//否则是修改头像
                    this.$refs.uploadImg.click();
                }
            },
            uploadAvatar(){//上传新头像
                let file = this.$refs.uploadImg.files[0];
                let imageType = file.name.split(".")[1];
                let imageSize = file.size/1024;
                if(imageSize > 500){
                    this.$message.error("头像大小不能超过500k");
                }else if( imageType != "png" && imageType != "jpg" && imageType != "jpeg"){
                    this.$message.error("只能上传 png、jpg 和 jpeg文件");
                }else{
                    this.$API.uploadAvatar(file).then(res => {
                        if(res.data){
                            this.updateUserInfo.userAvatar = res.data;
                        }else{
                            this.$message.error("上传失败");
                        }
                    })
                }
            },
            validateUserNickname(newVal){//验证用户昵称是否重复
                if(newVal){
                    this.$API.checkUserNickname(newVal).then(res => {
                        if(res.data.success){
                            this.userNickNameSuffixIcon = "el-icon-circle-check";
                        }else{
                            this.userNickNameSuffixIcon = "el-icon-circle-close";
                            this.$message.error("当前昵称已存在");
                        }
                    })
                }else{
                    this.userNickNameSuffixIcon = "el-icon-circle-close";
                    this.$message.error("输入不能为空");
                }
            },
        },
        created() {
            this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
        }
    }
</script>

<style scoped>
    .user-info-box {
        padding: 0 1rem;
        height: 80vh;
    }

    .user-info-tab {
        display: flex;
        justify-content: center;
        margin: 8px 0;
    }

    .user-info-avatar-box {
        height: 7rem;
        width: 7rem;
        border-radius: 50%;
        border: 5px solid #dddddd;
    }

    .user-info-avatar-box > img {
        height: 100%;
        width: 100%;
        border: 2px solid #f0f0f0;
        border-radius: 50%;
        cursor: pointer;
    }

    .user-info-title {
        transition: 0.5s;
        margin-bottom: 0.5rem !important;
        padding: 0;
    }

    .user-info-title:hover {
        transition: 0.5s;
        background-color: #f0f0f0;
    }

    .user-info-decision {
        font-size: 1rem;
        color: #8B8B8B;
    }

    .user-info-to-certified {
        transition: 0.5s;
        font-size: 0.9rem;
        color: #2F7AA6;
        cursor: pointer;
    }

    .user-info-to-certified:hover {
        transition: 0.5s;
        color: #3a8ee6;
    }

    .cms-divide-line {
        height: 1px;
        width: 80%;
        position: absolute;
        left: 10%;
        background-color: #999999;
    }

    .validateSuccess{
        color: lightgreen;
    }

    .validateFail{
        color: orangered;
    }
</style>
