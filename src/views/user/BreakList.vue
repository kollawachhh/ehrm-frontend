<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex h-5/6">
            <div class="mx-auto mt-6 w-10/12">
                <div class="flex bg-primary py-5 rounded-t-md">
                    <button @click="backPage" class="font-th ml-5 text-xl px-2 text-white">&#60;</button>
                    <span v-if="this.role === 'admin'" class="flex font-th text-white text-xl mx-5">รายงานการลา ({{this.date.day}})</span>
                    <span v-if="this.role !== 'admin'" class="flex font-th text-white text-xl mx-auto">{{ this.date.month  }} - {{ this.date.year }}</span>
                    <select v-if="this.role !== 'admin'" v-model="date.month" name="months" id="months" class="flex mr-5 w-5 bg-primary text-white">
                        <option v-for="(month, index) in months" :key="index" :value='month.name' class="bg-white text-primary">{{ month.name }}</option>
                    </select>
                </div>
                <div class="bg-gray-300 rounded-b-md h-5/6 py-3">
                    <div class="h-full mt-0 overflow-scroll" v-if="this.role === 'admin'">
                        <div class="pb-2" v-for="(leave, index) in this.leaveList" :key="index">
                            <span class="flex font-th pl-4">{{ leave.type }}</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">ชื่อพนักงาน : {{leave.user.name}}</span>
                                <span class="flex mb-3">เหตุผล : {{ leave.cause }}</span>
                                <span class="flex mb-3">ระยะเวลา : {{ leave.leave_dates }} วัน</span>
                                <span class="flex mb-3">วันที่ : {{ leave.date_start }} - {{ leave.date_end }}</span>
                                <span class="flex">
                                    สถานะ <p class="ml-1 mr-1">:</p>
                                    <span v-if="leave.status === 'confirmed'" class="text-emerald-500">ได้รับการยืนยัน</span>
                                    <span v-if="leave.status === 'waiting'" class="text-blue-500">รอการยืนยัน</span>
                                    <span v-if="leave.status === 'cancelled'" class="text-red-500">ปฏิเสธการยืนยัน</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="h-full mt-0 overflow-scroll" v-if="this.role !== 'admin'">
                        <div class="pb-2" v-for="(leave, index) in this.leaveList" :key="index">
                            <span class="flex font-th pl-4">{{ leave.type }}</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">เหตุผล <p class="ml-5 mr-2">:</p> {{ leave.cause }}</span>
                                <span class="flex mb-3">ระยะเวลา <p class="ml-2 mr-2">:</p> {{ leave.leave_dates }} วัน</span>
                                <span class="flex mb-3">วันที่ <p class="ml-9 mr-2">:</p> {{ leave.date_start }} - {{ leave.date_end }}</span>
                                <span class="flex">
                                    สถานะ <p class="ml-5 mr-2">:</p>
                                    <span v-if="leave.status === 'confirmed'" class="text-emerald-500">ได้รับการยืนยัน</span>
                                    <span v-if="leave.status === 'waiting'" class="text-blue-500">รอการยืนยัน</span>
                                    <span v-if="leave.status === 'cancelled'" class="text-red-500">ปฏิเสธการยืนยัน</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer tab='breaks'></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AuthUser from '@/store/AuthUser'
import LeaveStore from '@/store/Leave'
import Dropdown from 'vue-simple-search-dropdown';
export default {
    name:'BreakList',
    components: {
        Header,
        Footer,
        Dropdown,
    },
    data() {
        return {
            date: {
                month: "",
                year: "",
                day: ""
            },
            leaveList: [],
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
            status:'',
        }
    },
    mounted(){
        if (!this.isAuthen()) {
            this.$swal("คุณไม่มีสิทธิ์เข้าถึง", "กรุณาเข้าสู่ระบบ", "warning")
            this.$router.push("/")
        }
    },
    methods:{
        isAuthen() {
            if(AuthUser.getters.user != null){
                return AuthUser.getters.isAuthen
            }
        },
        async fetchLeaves() {
            const current = new Date();
            const today = current.toLocaleDateString('en-CA');
            if (this.role === "admin") {
                await LeaveStore.dispatch('fetchLeavesByDate', today)
            } else {
                await LeaveStore.dispatch('fetchLeaves')
            }
            this.leaveList = LeaveStore.getters.leaves.data
            this.leaveList.forEach(function(leave) {
            if (leave.type == "sick_leave") {
                leave.type = "ลาป่วย";
            } else if (leave.type == "personal_leave") {
                leave.type = "ลากิจ"
            } else if (leave.type == "vacation_leave") {
                leave.type = "ลาพักร้อน"
            } else if (leave.type == "maternity_leave") {
                leave.type = "ลาคลอด"
            }
            })
        },
        async backPage(){
            this.$router.go(-1)
        },   
    },
    created() {
        let today = new Date();
        this.date.month = today.toLocaleString('default', { month: 'long' })
        this.date.year = today.getFullYear()
        this.date.day = today.toLocaleDateString('en-CA');
        this.fetchLeaves()
    },
}
</script>

<style lang="scss" scoped></style>