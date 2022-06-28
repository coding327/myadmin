<template>
    <div>
        <!-- 组件1 MySearch占位 -->
        <MySearch @searchFunParent="searchFunParent"/>
        <!-- 组件2 MyTable占位 -->
        <MyTable :arr="arr" />
        <!-- 组件3 MyPage占位 -->
        <MyPage />
    </div>
</template>

<script type="text/javascript">
import MySearch from "./components/MySearch"
import MyTable from "./components/MyTable"
import MyPage from "./components/MyPage"
import { getHomeApi } from "../../api/homeApi" // 引入请求接口
export default {
    data() {
        return {
            arr: [],
            keyword: ''
        }
    },
    components: {
        MySearch,
        MyTable,
        MyPage,
    },
    mounted() {
        this.initGetHome()
    },
    methods: {
        searchFunParent(val) {
            this.keyword = val
            this.initGetHome()
        },
        // 请求接口调用进行封装
        // initGetHome() {
        //     getHomeApi().then((res) => {
        //         // console.log("res", res)
        //         if (res.code == 200) {
        //             this.arr = res.data
        //         }
        //     })
        // },
        // 引入关键词，对于请求接口调用进行升级[注意参数是对象]
        initGetHome() {
            getHomeApi({ keyword: this.keyword }).then((res) => {
                // console.log("res", res)
                if (res.code == 200) {
                    this.arr = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
</style>
