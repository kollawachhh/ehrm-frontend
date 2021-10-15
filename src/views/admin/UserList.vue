<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-3/4">
            <div class="mx-auto mt-8 h-full bg-gray-300 rounded-md">
                <div class="flex bg-primary py-5 rounded-t-md">
                    <button @click="backPage" class="font-th ml-5 text-xl px-2 mr-16 text-white">&#60;</button>
                    <span class="font-th text-white ml-3 text-xl">รายการผู้ใช้</span>
                </div>
                <div class=" bg-gray-300 rounded-b-md h-5/6 ">
                    <div class="flex w-11/12 h-7 mx-auto my-5">
                        <select @change="fetchUser($event)" name="" id="" class="flex font-th w-3/4 bg-white px-3 mr-3 rounded-md">
                            <option value="" disabled selected hidden>ค้นหาลูกค้าจากระบบ</option>
                            <option v-for="(user, index) in searchList" :key="index" :value="user.id">{{user.id + " : " + user.name}}</option>
                        </select>
                        <a href="/userForm" class="px-3 w-1/4 py-1 font-th text-white bg-secondary rounded-md">เพิ่มผู้ใช้</a>
                    </div>
                    <table class="mx-2 h-full">
                        
                        <thead class="w-full flex border-b-4 border-primary">
                            <tr class="flex font-th w-80 text-md">
                                <th class="w-1/6 border-l-2 border-primary"><span class="mx-auto">ไอดี</span></th>
                                <th class="w-2/6 border-l-2 border-primary"><span class="mx-auto">ชื่อ</span></th>
                                <th class="w-3/6 border-l-2 border-r-2 border-primary"><span class="mx-auto">เข้าใช้ล่าสุด</span></th>
                            </tr>
                        </thead>
                        <div class="flex w-80 h-full overflow-y-scroll">
                            <tbody class="w-80 h-5/6 overflow-y-scroll">
                                    <tr v-for="(user, index) in allUsers" :key="index" class="flex font-eng border-b-2 border-primary py-2 text-sm">
                                        <button class="flex w-full" @click="getDetail(user.id)">
                                            <td class="text-center w-1/6">{{user.id}}</td>
                                            <td class="text-center w-2/6">{{user.name}}</td>
                                            <td class="text-center w-3/6">{{getLoginTime(user.updated_at)}}</td>
                                        </button>
                                    </tr>
                            </tbody>
                        </div>
                    </table>
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
import moment from 'moment'

export default {
    name:'UserList',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            allUsers: [],
            searchList: [],
        }
    },
    created(){
        this.fetchAllUser()
    },
    methods:{
        async getDetail(userId){
            this.$router.push('/user/' + userId)
        },
        async backPage(){
            this.$router.go(-1)
        },
        async fetchAllUser(){
            await AdminStore.dispatch('fetchAllUser')
            this.searchList = AdminStore.getters.users
            this.allUsers = AdminStore.getters.users
        },
        async fetchUser(event){
            await AdminStore.dispatch('fetchUser', event.target.value)
            this.allUsers = [AdminStore.getters.users]
        },
        getLoginTime(time){
            return moment(time).format("DD-MM-YYYY HH:mm:ss")
        },
    },
}
</script>

<style lang="scss" scoped></style>