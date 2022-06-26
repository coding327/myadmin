<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <router-link to="home">Home</router-link>
                <router-link to="user">User</router-link>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script type="text/javascript">
export default {
    data() {
        return {}
    },
    components: {},
    methods: {},
}
</script>

<style lang="less" scoped>
.el-container {
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
