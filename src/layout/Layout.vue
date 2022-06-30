<template>
    <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside>
                <Aside />
            </el-aside>
            <el-container>
                <!-- 面包屑 -->
                <Bread />
                <el-main id="xtable">
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script type="text/javascript">
import Header from "./Header.vue"
import Aside from "./Aside.vue"
import Bread from "./Bread.vue"
export default {
    data() {
        return {}
    },
    components: {
        Header,
        Aside,
        Bread
    },
    methods: {},
}
</script>

<style lang="less" scoped>
.el-container {
    overflow: hidden; // 侧边栏超出
    height: 100%;
}
.el-header,
.el-footer {
    background-color: #b3c0d1;
}

.el-aside {
    background-color: #d3dce6;
}

.el-main {
    background-color: #f6f7fc;
}
</style>
