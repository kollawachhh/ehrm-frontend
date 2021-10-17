<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap mt-6 w-screen h-3/4">
            <div class="mx-auto h-full bg-gray-300 rounded-md ">
                <div class="flex bg-primary py-5 rounded-t-md ">
                    <button @click="backPage" class="font-th ml-5 text-xl px-2 text-white">&#60;</button>
                    <!-- <span v-if="this.role === 'Admin'" class="flex font-th text-white text-xl mx-auto">รายการลงงาน {{ this.date.day  }}</span>
                    <span v-else class="flex font-th text-white text-xl mx-auto">{{ this.date.month  }} - {{ this.date.year }}</span> -->
                    <span class="flex font-th text-white text-xl mx-auto">{{ getMonthTH(this.date.month) }} - {{ this.date.year }}</span>
                    <select v-model="date.month" name="months" id="months" class="flex mr-5 w-5 bg-primary text-white">
                        <option v-for="(month, index) in months" :key="index" :value='month.name' class="bg-white text-primary">{{ month.name }}</option>
                    </select>
                </div>
                <div class="bg-gray-300 rounded-b-md h-5/6 px-2">
                    <table class="mx-auto h-full mt-1 ">
                        <thead class="flex border-b-4 border-primary">
                            <tr class="font-th w-80 text-md">
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">วันที่</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาเข้า</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาออก</span></th>
                                <th class="w-20 border-l-2 border-r-2 border-primary"><span class="mx-auto">เวลารวม</span></th>
                            </tr>
                        </thead>
                        <div class="flex h-full w-80 overflow-y-scroll">
                            <tbody class="w-80" v-bind:class="{'h-5/6':role === 'admin'}">
                                <tr class="flex font-eng border-b-2 mt-1 pb-1 border-primary text-sm"
                                    v-for="(log, index) in resultQuery" :key="index">
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
import moment from 'moment'

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
                day: ""
            },
            logList: [],
            role: AuthUser.getters.user.role,
            months:[
                { id: '1', name: 'January' },
                { id: '2', name: 'Febuary' },
                { id: '3', name: 'March' },
                { id: '4', name: 'April' },
                { id: '5', name: 'May' },
                { id: '6', name: 'June' },
                { id: '7', name: 'July' },
                { id: '8', name: 'August' },
                { id: '9', name: 'September' },
                { id: '10', name: 'October' },
                { id: '11', name: 'November' },
                { id: '12', name: 'December' },
            ],
        }
    },
    mounted(){
        if (!this.isAuthen()) {
            this.$swal("คุณไม่มีสิทธิ์เข้าถึง", "กรุณาเข้าสู่ระบบ", "warning")
            this.$router.push("/")
        }
    },
    async created() {
        let today = new Date();
        this.date.month = today.toLocaleString('default', { month: 'long' })
        this.date.year = today.getFullYear();
        this.date.day = today.toLocaleDateString('en-CA');
        if (this.role === 'admin'){
            await this.fetchLogsByDate()
        } else {
            await this.fetchLogs()
        }
        
    },
    methods:{
        isAuthen() {
            if(AuthUser.getters.user != null){
            return AuthUser.getters.isAuthen
            }
        },
        async fetchLogs() {
            await LogStore.dispatch('fetchLogs')
            this.logList = LogStore.getters.logs.data
        },
        async fetchLogsByDate() {
            let date = new Date().toLocaleDateString('en-CA');
            await LogStore.dispatch('fetchLogsByDate', date)
            this.logList = LogStore.getters.logs
        },
        async backPage(){
            this.$router.go(-1)
        },
        getMonthTH(month){
            switch(month){
                case 'January':
                    return 'มกราคม'
                case 'Febuary':
                    return 'กุมภาพันธ์'
                case 'March':
                    return 'มีนาคม'
                case 'April':
                    return 'เมษายน'
                case 'May':
                    return 'พฤษภาคม'
                case 'June':
                    return 'มิถุนายน'
                case 'July':
                    return 'กรกฏาคม'
                case 'August':
                    return 'สิงหาคม'
                case 'September':
                    return 'กันยายน'
                case 'October':
                    return 'ตุลาคม'
                case 'November':
                    return 'พฤศจิกายน'
                case 'December':
                    return 'ธันวาคม'
            }   
        }
    },
    computed: {
        resultQuery(){
            if(this.date.month){
                return this.logList.filter((item)=>{
                    return this.date.month.toLowerCase().split(' ').every(v => (moment(item.created_at).format('MMMM')).toLowerCase().includes(v))
                })
                }else{
                    return this.logList;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>