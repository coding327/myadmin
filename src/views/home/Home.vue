<template>
    <div>
        <!-- 组件1 MySearch占位 -->
        <MySearch @addShow="addShow" @searchFunParent="searchFunParent"/>
        <!-- 组件2 MyTable占位 -->
        <MyTable :arr="arr" @editData="editData" @delParent="initGetHome" @batchDel="initGetHome" />
        <!-- 组件3 MyPage占位 -->
        <MyPage
            :page="page"
            :pageSize="pageSize"
            :total="total"
            :pageSizes="pageSizes"
            @changePageSize="changePageSize"
            @changePage="changePage"
        />
        <!-- 组件4 MyDialog占位 -->
        <MyDialog :btnType="btnType" :row="row" @cancelForm="cancelForm" v-if="show" @resetTable="resetTable"/>
    </div>
</template>

<script type="text/javascript">
import MySearch from "./components/MySearch"
import MyTable from "./components/MyTable"
// import MyPage from "./components/MyPage" // 分页组件作为公共组件
import { getHomeApi } from "../../api/homeApi" // 引入请求接口
import MyDialog from './components/MyDialog.vue'
export default {
    data() {
        return {
            arr: [], // 表格渲染的数据
            keyword: "", // 关键词
            page: 1, // 当前页码
            pageSize: 20, // 每一页显示多少条数据
            total: 0, // 数据总条数
            pageSizes: [20, 40, 60, 80, 100], // 和pageSize成套使用
            show: false, // 控制弹框显示
            row: {}, // 保存当前编辑行数据
            btnType: 0
        }
    },
    components: {
        MySearch,
        MyTable,
        // MyPage,
        MyDialog
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
            getHomeApi({ keyword: this.keyword, page: this.page, pageSize: this.pageSize }).then((res) => {
                // console.log("res", res)
                if (res.code == 200) {
                    this.arr = res.data
                    this.total = res.total
                }
            })
        },
        changePageSize(val) {
            this.pageSize = val
            this.initGetHome()
        },
        changePage(val) {
            this.page = val
            this.initGetHome()
        },
        resetTable() {
            this.initGetHome()
            this.show = !this.show
        },
        cancelForm() {
            this.show = !this.show
        },
        addShow() {
            this.row = {}
            this.show = !this.show
            this.btnType = 0
        },
        editData(val) {
            this.row = val
            this.show = !this.show
            this.btnType = 1
        }
    },
}
</script>

<style lang="less" scoped>
</style>
