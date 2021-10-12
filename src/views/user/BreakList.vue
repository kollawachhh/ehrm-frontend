<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-4/5">
            <div class="mx-auto mt-8 h-5/6">
                <div class="bg-primary px-28 py-5 rounded-t-md">
                    <span class="font-th text-white text-xl">{{ this.date.month  }} - {{ this.date.year }}</span>
                </div>
                <div class="bg-gray-300 rounded-b-md h-full overflow-scroll">
                    <div class="pt-2">
                        <span class="flex font-th py-2 pl-4">ลาป่วย</span>
                        <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                            <span class="flex mb-3">เหตุผล : มีไข้สูง</span>
                            <span class="flex mb-3">ระยะเวลา : 3 วัน</span>
                            <span class="flex">วันที่ : 3 - 5 วัน</span>
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
export default {
    name:'BreakList',
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
            leaveList: [],
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
            if(AuthUser.getters.user != null)
            return AuthUser.getters.isAuthen
        },
        async fetchLeaves() {
            await LeaveStore.dispatch('fetchLeaves')
            this.leaveList = LeaveStore.getters.leaves
        }        
    },
    created() {
        let today = new Date();
        this.date.month = today.toLocaleString('default', { month: 'long' })
        this.date.year = today.getFullYear()
        this.fetchLeaves()
    },
}
</script>

<style lang="scss" scoped>

</style>