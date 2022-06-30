<template>
    <div class="container">
        <div class="login-form">
            <div class="login-title">
                <!-- 方法一：直接引入，大部分情况下模板中引入图片资源是加载不到的，vue在编译模板资源的时候好多情况下会丢失图片 -->
                <!-- <img src="../../assets/logo.png" alt=""> -->
                <!-- 方法二：require先加载图片，然后让vue去编译模板【注意src动态绑定这样里面的代码才能让vue识别】 -->
                <!-- <img :src="require('../../assets/logo.png')" alt=""> -->
                <!-- 方法三：使用import引入作为变量，直接挂到vue的data里面【注意动态绑定src，data里的数据在vue外面的变量都是可以挂到上面去使用的】 -->
                <img :src="logo" alt="" />
                <h3>物流智能后台管理系统</h3>
            </div>
            <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- show-password开启密码小眼睛，auto-complete="new-password"关闭密码自动填入 -->
                <el-form-item label="密码" prop="pwd">
                    <el-input
                        type="password"
                        v-model="loginForm.pwd"
                        show-password
                        auto-complete="new-password"
                    ></el-input>
                </el-form-item>
                <el-form-item class="loginBtn">
                    <el-button type="warning" @click="submitForm('loginForm')"
                        >登 录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/javascript">
// 最好的引入图片方式
import logo from "../../assets/logo.png"
// 引入请求接口
import { loginApi } from "../../api/loginApi"
// 引入cookie工具类
import { setToken } from "../../utils/cookieUtils"
export default {
    data() {
        return {
            logo,
            loginForm: {
                username: "",
                pwd: "",
            },
            rules: {
                username: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在3到10个字符",
                        trigger: "blur",
                    },
                ],
                pwd: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            },
        }
    },
    components: {},
    methods: {
        submitForm(formName) {
            // 注意formName是形参，最终通过中括号拿到组件，实参得是字符串的表单键名【那个表单对象存储用户名和密码】
            // 验证表单数据，这个是最终验证，之前每个输入框对应自己的验证规则都通过，代表最终验证通过【所有的都通过才表示都通过才能提交】
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.loginForm) // 成功拿到表单数据
                    // 调用请求接口
                    loginApi(this.loginForm).then((res) => {
                        // console.log(res)
                        if (res.code == 200) {
                            // console.log(res.msg)
                            // token:token是保存到cookie中的，通过查找cookie中有无token来判断用户登录状态，注册时后端生成token，token就是字符串，规则：username + '---token---' ,注意使用username来做token字符串，是因为用户名具有唯一性
                            // 请求成功,首先是保存后端返回的token,把token保存到cookie中，同时每次跳转token放入请求头，进行跳转，cookie保存数据每次都会前后端传递
                            // console.log(res)
                            setToken("token", res.data) // 控制台Application里Cookies成功看到设置的token
                            // 使用query传递参数，里面也可以写对象形式
                            // this.$router.push(
                            //     `/?username=${this.loginForm.username}`
                            // )
                            // 不传递参数，让首页通过token取值
                            this.$router.push(
                                `/`
                            )
                        }
                    })
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    background: url("../../assets/bg9.jpg") no-repeat center center;
    background-size: cover;
    .login-form {
        width: 340px;
        height: 300px;
        border-radius: 5px;
        padding: 0 20px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .login-title {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            font-size: 22px;
            img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
        }
        .loginBtn {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
