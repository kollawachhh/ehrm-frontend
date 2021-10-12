<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap mt-6 w-screen h-3/4">
            <div class="mx-auto h-full bg-gray-300 rounded-md">
                <div class="flex bg-primary px-28 py-5 rounded-t-md">
                    <span class="font-th text-white text-xl mx-auto">{{ this.date.month  }} - {{ this.date.year }}</span>
                </div>
                <div class="bg-gray-300 rounded-b-md h-5/6">
                    <div v-if="role === 'Admin'" class="flex h-7 mx-4 mt-5">
                        <input type="text" placeholder="ค้นหาผู้ใช้" class="flex font-th text-primary w-56 px-3 mr-3 rounded-md">
                        <button type="submit" class="font-th text-white px-6 bg-primary rounded-md">ค้นหา</button>
                    </div>
                    <table class="mx-auto h-full" v-bind:class="{'mt-5':role === 'Admin','mt-1':role !== 'Admin'}">
                        <thead class="flex border-b-4 border-primary">
                            <tr class="font-th w-80 text-md">
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">วันที่</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาเข้า</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาออก</span></th>
                                <th class="w-20 border-l-2 border-r-2 border-primary"><span class="mx-auto">เวลารวม</span></th>
                            </tr>
                        </thead>
                        <div class="flex w-80 overflow-y-scroll" v-bind:class="{'h5/6':role === 'Admin', 'h-full' :role !== 'Admin'}">
                            <tbody class="w-80" v-bind:class="{'h-5/6':role === 'Admin'}">
                                <tr class="flex font-eng border-b-2 mt-1 pb-1 border-primary text-sm"
                                    v-for="(log, index) in logList" :key="index">
                                    <td class="text-center w-1/4">{{ log.date }}</td>
                                    <td class="text-center w-1/4">{{ log.login_time }}</td>
                                    <td class="text-center w-1/4">{{ log.logout_time }}</td>
                                    <td class="text-center w-1/4">{{ log.total_hours }}<span class="font-th"> ชม.</span></td>
                                </tr>
                            </tbody>
                        </div>
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
            role: '',
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
            if(AuthUser.getters.user != null){
                if(AuthUser.getters.user.is_admin === 1){
                    this.role = 'Admin'
                }
            return AuthUser.getters.isAuthen
            }
            
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