<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-3/4">
            <div class="mx-auto mt-8 h-full bg-gray-300 rounded-md">
                <div class="flex bg-primary px-28 py-5 rounded-t-md">
                    <span class="font-th text-white text-xl mx-auto">{{ this.date.month  }} - {{ this.date.year }}</span>
                </div>
                <div class="flex bg-gray-300 rounded-b-md mt-5 h-5/6 overflow-y-scroll">
                    <table class="mx-2">
                        <thead>
                            <tr class="font-th w-80 text-md">
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">วันที่</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาเข้า</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาออก</span></th>
                                <th class="w-20 border-l-2 border-r-2 border-primary"><span class="mx-auto">เวลารวม</span></th>
                            </tr>
                        </thead>
                        <tbody class="border-t-4 border-primary">
                            <tr class="font-eng border-t-2 border-primary text-sm h-24"
                                v-for="(log, index) in logList" :key="index">
                                <td class="text-center">{{ log.date }}</td>
                                <td class="text-center">{{ log.login_time }}</td>
                                <td class="text-center">{{ log.logout_time }}</td>
                                <td class="text-center">{{ log.total_hours }}<span class="font-th"> ชม.</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Footer tab='tasks'></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AuthUser from '@/store/AuthUser'
import LogStore from '@/store/Log'
export default {
    name:'TaskList',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            date: {
                month: "",
                year: "",
            },
            logList: [],
        }
    },
    mounted(){
        if (!this.isAuthen()) {
            this.$swal("คุณไม่มีสิทธิ์เข้าถึง", "กรุณาเข้าสู่ระบบ", "warning")
            this.$router.push("/")
        }
    },
    created() {
        let today = new Date();
        this.date.month = today.toLocaleString('default', { month: 'long' })
        this.date.year = today.getFullYear()
        this.fetchLogs()
    },
    methods:{
        isAuthen() {
            if(AuthUser.getters.user != null)
            return AuthUser.getters.isAuthen
        },
        async fetchLogs() {
            await LogStore.dispatch('fetchLogs')
            this.logList = LogStore.getters.logs
        }
    }
}
</script>

<style lang="scss" scoped>

</style>