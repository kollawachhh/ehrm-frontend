<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-3/4">
            <div class="mx-auto mt-8 h-full w-10/12 bg-gray-300 rounded-md">
                <div class="flex bg-primary py-5 rounded-t-md">
                    <button @click="backPage" class="font-th ml-5 text-xl px-2 mr-16 text-white">&#60;</button>
                    <span class="font-th text-white ml-6 text-xl">ข้อมูลผู้ใช้</span>
                </div>
                <div class="bg-gray-300 w-full rounded-b-md h-5/6 ">
                    <div class="my-5">
                        <img src="/icons/user_test_img.png" alt="" class="w-40 h-40 rounded-full mx-auto  bg-white">
                    </div>
                    <hr class="flex w-80 mx-auto border-1 border-white">
                    <div class="font-th text-primary leading-9 my-5">
                        <div class="flex mx-10">ชื่อ<p class="ml-10 mr-5">:</p>{{this.currentUser.name}} </div>
                        <div class="flex mx-10">ตำแหน่ง<p class="ml-1 mr-5">:</p>{{this.currentUser.position}} </div>
                        <div class="flex mx-10">แผนก<p class="ml-5 mr-5">:</p>{{this.currentUser.department}} </div>
                    </div>
                    <hr class="flex w-80 mx-auto mb-5 border-1 border-white">
                    <div v-if='this.$route.params.id !== undefined' class="flex font-th text-white">
                        <button @click="getTaskList" class="mx-auto p-2 bg-primary rounded-md">ดูประวัติลงงาน</button>
                        <button @click="getBreakList" class="mx-auto p-2 bg-primary rounded-md">ดูประวัติลางาน</button>
                    </div>
                    <div v-else class="w-full font-th ">
                        <div class="flex mb-2">
                            <span class="font-bold mx-auto">จำนวนการลาที่เหลือ</span>
                        </div>
                        <div class="flex text-lg mx-10 mb-1">
                            <div class="leading-9">
                                <span class="flex">ลาป่วย </span>
                                <span class="flex">ลากิจ </span>
                                <span class="flex">ลาพักร้อน </span>
                                <span class="flex">ลาคลอด </span>
                            </div>
                            <div class="ml-5 leading-9">
                                <span class="flex">: {{this.currentUser.sick_leave_left}}</span> 
                                <span class="flex">: {{this.currentUser.personal_leave_left}}</span> 
                                <span class="flex">: {{this.currentUser.vacation_leave_left}}</span> 
                                <span class="flex">: {{this.currentUser.maternity_leave_left}}</span> 
                            </div>
                        </div>
                        <div class="flex mx-auto">
                            <button @click="logout" class="mx-auto p-2 bg-primary rounded-md text-white">ออกจากระบบ</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <Footer tab='none'></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AdminStore from "@/store/Admin"
import AuthUser from '@/store/AuthUser'

export default {
    created(){
        this.fetchUser()
    },
    data() {
        return {
            user_id: this.$route.params.id,
            currentUser:[],
        }
    },
    name:'UserList',
    components: {
        Header,
        Footer
    },
    methods:{
        async getTaskList(){
            this.$router.push(`/task/${this.user_id}`)
        },
        async getBreakList(){
            this.$router.push(`/break/${this.user_id}`)
        },
        async backPage(){
            if(AuthUser.getters.user.role !== 'admin'){
                this.$router.go(-1)
            }
            else{
                this.$router.go(-2)
            }
            
        },
        async fetchUser(){
            if(this.$route.params.id !== undefined){
                await AdminStore.dispatch('fetchUser', this.user_id)
                this.currentUser = AdminStore.getters.users
            }
            else{
                this.currentUser = AuthUser.getters.user
            }
        },
        async logout() {
            this.$fire({
                title: 'กำลังจะออกจากระบบ',
                text: "คุณต้องการออกจากระบบใช่หรือไม่?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            }).then((r) => {
                console.log(r)
                if(r.value){
                    AuthUser.dispatch('logout')
                    this.$swal("ออกจากระบบแล้ว!", `คุณได้ทำการออกจากระบบ`, "success")
                    this.$router.push('/')
                }
            });
        }
    },
    mounted(){
        const thisInstance = this
        this.$root.$on('event', function(){
            thisInstance.fetchUser()
        })
    }
}
</script>

<style lang="scss" scoped></style>