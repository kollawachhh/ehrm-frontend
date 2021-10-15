<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex flex-wrap w-screen">
        <div class="mx-auto mt-8">
            <div class="bg-primary py-5 rounded-t-md">
                <!-- <a href="/home" class="font-th text-xl px-2 text-white">&#60;</a> -->
                <span class="font-th pl-28 pr-36 text-white text-xl">เพิ่มผู้ใช้</span>
            </div>
            <div class="bg-gray-300 rounded-b-md pb-4">
                <form @submit.prevent="submit">
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">ชื่อ</span>
                        <input type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกชื่อ">
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">อีเมลล์</span>
                        <input type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกอีเมลล์ผู้ใช้">
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">รหัสผ่าน</span>
                        <input type="password" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกรหัสผ่าน">
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">ยืนยันรหัสผ่าน</span>
                        <input type="password" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกรหัสผ่านอีกครั้ง">
                    </div>
                    <button type="submit" class=" flex font-th bg-primary text-white px-3 py-1 rounded-md mx-auto mt-48">ยืนยัน</button>
                </form>
            </div>
        </div>
    </div>
    <Footer tab='none'></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Dropdown from 'vue-simple-search-dropdown';
export default {
    data() {
        return {
            form: {
                name: "",
                username: "",
                password: "",
                confirmPassword: "",
            }
        }
    },
    methods:{
        async submit(){
            this.$router.push('/userList')
        },
        clearForm() {
            this.form = {
                name: "",
                username: "",
                password: "",
                confirmPassword: "",
            }
        }
    },
    name:'UserForm',
    components:{
        Header,
        Footer,
        Dropdown,
    }
}
</script>

<style scoped></style>