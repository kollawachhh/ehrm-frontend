<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex flex-wrap w-screen h-3/4">
        <div class="mx-auto mt-8 h-full w-10/12 bg-gray-300 rounded-md">
            <div class="flex bg-primary py-5 rounded-t-md">
                <button @click="backPage" class="font-th ml-5 text-xl px-2 mr-16 text-white">&#60;</button>
                <span class="font-th text-white ml-7 text-xl">เพิ่มผู้ใช้</span>
            </div>
            <div class="bg-gray-300 rounded-b-md pb-3">
                <form @submit.prevent="submit">
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-1">ชื่อ</span>
                        <input v-model="form.name" type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกชื่อ">
                    </div>
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">อีเมลล์</span>
                        <input v-model="form.email" type="email" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกอีเมลล์ผู้ใช้">
                    </div>
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">รหัสผ่าน</span>
                        <input v-model="form.password" type="password" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกรหัสผ่าน">
                    </div>
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">ยืนยันรหัสผ่าน</span>
                        <input v-model="form.confirmPassword" type="password" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกรหัสผ่านอีกครั้ง">
                    </div>
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">ตำแหน่ง</span>
                        <input v-model="form.position" type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกตำแหน่งของคุณ">
                    </div>
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">แผนก</span>
                        <input v-model="form.department" type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกแผนกของคุณ">
                    </div>
                    <button type="submit" class=" flex font-th bg-primary text-white px-3 py-1 rounded-md mx-auto mt-12">ยืนยัน</button>
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
import AdminStore from "@/store/Admin"

export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                position: "",
                department: "",
            }
        }
    },
    methods:{
        async submit(){
            if( this.form.name !== "" &&
                this.form.email !== "" &&
                this.form.password !== "" &&
                this.form.confirmPassword !== "" &&
                this.form.position !== "" &&
                this.form.department !== "" &&
                this.form.password === this.form.confirmPassword){
                    let newUser = {
                        name:this.form.name,
                        email:this.form.email,
                        password:this.form.password,
                        position:this.form.position,
                        department:this.form.department
                    }
                    await AdminStore.dispatch('createUser',newUser)
                    this.$swal("เพิ่มผู้ใช้สำเร็จ","ข้อมูลผู้ใช้ถูกต้อง", "success")
                    this.$router.push('/user')
            }else{
                this.$swal("ข้อมูลไม่ถูกต้อง", "กรุณาลองอีกครั้ง", "error")
                this.clearForm()
            }
        },
        clearForm() {
            this.form = {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            }
        },
        async backPage(){
            this.$router.go(-1)
        },
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