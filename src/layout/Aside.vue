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
            <!-- <router-link to="/layout/home" tag="span">
                <el-menu-item index="1">
                    <i class="el-icon-menu" style="margin-left: 10px"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link> -->
            <!-- 没有子菜单 -->
            <!-- <router-link to="/layout/userManage" tag="span">
                <el-menu-item index="2">
                    <i class="el-icon-setting" style="margin-left: 10px"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </router-link> -->
            <!-- 有子菜单 -->
            <!-- <el-submenu index="3">
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
            </el-submenu> -->

            <!-- el-menu菜单内渲染【注意item相当于li缺ul，这里使用template当ul最好】 -->
            <!-- 动态渲染路由 -->
            <template v-for="(item, index) in menu">
                <!-- 没有子菜单,就使用没有子菜单的模板 -->
                <router-link
                    :to="'/layout/' + item.path"
                    tag="span"
                    v-if="!item.children"
                    :key="item.path + '-' + index"
                >
                    <el-menu-item :index="item.path + '-' + index">
                        <i class="el-icon-menu" style="margin-left: 10px"></i>
                        <span slot="title">{{ item.meta.title }}</span>
                    </el-menu-item>
                </router-link>
                <!-- 有子菜单就使用submenu模板 -->
                <el-submenu
                    :index="item.path + '-' + index"
                    :key="item.path + '-' + index"
                    v-if="item.children"
                >
                    <template slot="title">
                        <i
                            class="el-icon-location"
                            style="margin-left: 10px"
                        ></i>
                        <span slot="title">{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item-group>
                        <router-link
                            v-for="(child, cindex) in item.children"
                            :to="'/layout/' + item.path + '/' + child.path"
                            :key="item.path + '-' + index + '-' + cindex"
                            tag="span"
                            active-text-color="#ffd04b"
                            text-color="#fff"
                            ><el-menu-item
                                :index="index + '-' + cindex"
                                style="padding-left: 70px"
                                >{{ child.meta.title }}</el-menu-item
                            ></router-link
                        >
                    </el-menu-item-group>
                </el-submenu>
            </template>
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
    computed: {
        menu() {
            // 使用vuex的store需要在main.js里引入store,同时作为vue实例的配置项
            // console.log(this.$store)
            return (
                this.$store.state.routes[1] &&
                this.$store.state.routes[1].children
            )
        },
    },
}
</script>

<style lang="less" scoped>
/deep/.el-icon-arrow-down:before {
    content: "\e6df";
    margin-right: 10px;
}
</style>
