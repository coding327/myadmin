<template>
    <!-- 重新设置默认活跃 -->
    <div style="overflow: hidden">
        <el-menu
            class="el-menu-vertical-demo"
            default-active="1"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <!-- 没有子菜单 -->
            <router-link to="/layout/home" tag="span">
                <el-menu-item index="1">
                    <i class="el-icon-menu" style="margin-left: 10px"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
            <!-- 没有子菜单 -->
            <router-link to="/layout/userManage" tag="span">
                <el-menu-item index="2">
                    <i class="el-icon-setting" style="margin-left: 10px"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </router-link>
            <!-- 有子菜单 -->
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location" style="margin-left: 10px"></i>
                    <span slot="title">资金管理</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/layout/fundManage/areaManage" tag="span"
                        ><el-menu-item index="3-1" style="padding-left: 70px"
                            >区域管理</el-menu-item
                        ></router-link
                    >
                    <router-link to="/layout/fundManage/fundWater">
                        <el-menu-item index="3-2" style="padding-left: 70px"
                            >资金流水</el-menu-item
                        >
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script type="text/javascript">
export default {
    data() {
        return {
            isCollapse: false, // 控制展开和折叠
        }
    },
    methods: {},
}
</script>

<style lang="less" scoped>
/deep/.el-icon-arrow-down:before {
    content: "\e6df";
    margin-right: 10px;
}
</style>
