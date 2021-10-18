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
                        <span class="flex font-th pb-1">
                            ชื่อ
                            <span v-if="this.errors === 'fields required' || this.errors === 'name required'" 
                            class="text-red-500 ml-1 font-bold text-lg">!</span>
                        </span>
                        <input 
                            v-model="form.name" 
                            type="text" 
                            class="p-2 font-th w-11/12 rounded-md" 
                            v-bind:class="{'border border-red-400': this.errors === 'fields required' || this.errors === 'name required' }"
                            placeholder="กรอกชื่อ">
                    </div>
                    <div class="pl-6 py-4">
                        <span class="flex font-th pb-1">
                            อีเมลล์
                            <span v-if="this.errors === 'fields required' || this.errors === 'email required'" 
                            class="text-red-500 ml-1 font-bold text-lg">!</span>
                        </span>
                        <input 
                            v-model="form.email" 
                            type="email" 
                            class="p-2 font-th w-11/12 rounded-md" 
                            v-bind:class="{'border border-red-400': this.errors === 'fields required' || this.errors === 'email required'}"
                            placeholder="กรอกอีเมลล์ผู้ใช้">
                    </div>
                    <span class="font-th ml-6">
                        รหัสผ่าน
                        <span v-if="this.errors === 'fields required' || this.errors === 'password required' || this.errors === 'confirm password required' || this.errors === 'password invalid'" 
                        class="text-red-500 ml-1 font-bold text-lg">!</span>
                    </span>
                    <div class="flex w-11/12">    
                        <div class="pl-6">
                            <input 
                                v-model="form.password" 
                                type="password" 
                                class="p-2 font-th w-full rounded-md" 
                                v-bind:class="{'border border-red-400': this.errors === 'fields required' || this.errors === 'password required' || this.errors === 'password invalid'}"
                                placeholder="กรอกรหัสผ่าน">
                        </div>
                        <div class="ml-5">
                            <input 
                                v-model="form.confirmPassword" 
                                type="password" 
                                class="p-2 font-th w-full rounded-md" 
                                v-bind:class="{'border border-red-400': this.errors === 'fields required' || this.errors === 'confirm password required' || this.errors === 'password invalid'}"
                                placeholder="ยืนยันรหัสผ่าน">
                        </div>
                    </div>
                    
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">
                            ตำแหน่ง
                            <span v-if="this.errors === 'fields required' || this.errors === 'position required'" 
                            class="text-red-500 ml-1 font-bold text-lg">!</span>
                        </span>
                        <input 
                            v-model="form.position" 
                            type="text" 
                            class="p-2 font-th w-11/12 rounded-md" 
                            v-bind:class="{'border border-red-400': this.errors === 'fields required' || this.errors === 'position required'}"
                            placeholder="กรอกตำแหน่งของผู้ใช้">
                    </div>
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">
                            แผนก
                            <span v-if="this.errors === 'fields required' || this.errors === 'department required'" 
                            class="text-red-500 ml-1 font-bold text-lg">!</span>
                        </span>
                        <input 
                            v-model="form.department" 
                            type="text" 
                            class="p-2 font-th w-11/12 rounded-md" 
                            v-bind:class="{'border border-red-400': this.errors === 'fields required' || this.errors === 'department required'}"
                            placeholder="กรอกแผนกของผู้ใช้">
                    </div>
                    <div class="font-eng pl-6 pt-4">
                        <span class="flex pb-1">
                            role
                        </span>
                        <select 
                            v-model="form.role"
                            class="p-2 w-11/12 rounded-md bg-white" name="" id="">
                            <option v-for="(role, index) in roles" :value="role.name" :key="index">
                                {{role.name}}
                            </option>
                        </select>
                    </div>
                    <button type="submit" class=" flex font-th bg-primary text-white px-3 py-1 rounded-md mx-auto mt-9">ยืนยัน</button>
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
                role:"user",
            },
            roles:[
                {
                    id: 1,
                    name: "user",
                },
                {
                    id: 2,
                    name: "head",
                },
                {
                    id: 3,
                    name: "admin"
                },
            ],
            errors: '',
        }
    },
    methods:{
        async submit(){
            this.$fire({
                title: 'เพิ่มผู้ใช้',
                text: "คุณต้องการที่จะเพิ่มผู้ใช้ใช่ไหม?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            }).then((r) => {
                if(r.value){
                    if( this.form.name !== "" &&
                        this.form.email !== "" &&
                        this.form.password !== "" &&
                        this.form.confirmPassword !== "" &&
                        this.form.position !== "" &&
                        this.form.department !== "" &&
                        this.form.role !== "" &&
                        this.form.password === this.form.confirmPassword){
                            let newUser = {
                                name:this.form.name,
                                email:this.form.email,
                                password:this.form.password,
                                position:this.form.position,
                                department:this.form.department,
                                role:this.form.role
                            }
                            this.putData(newUser)
                    }
                    else{
                        if( this.form.name === "" &&
                            this.form.email === "" &&
                            this.form.password === "" &&
                            this.form.confirmPassword === "" &&
                            this.form.position === "" &&
                            this.form.department === ""){
                                this.errors = 'fields required'
                                this.$swal("ข้อมูลผิดพลาด", "กรุณากรอกข้อมูล", "error")
                        }
                        else if(this.form.name === ""){
                            this.errors = 'name required'
                            this.$swal("ข้อมูลผิดพลาด", "กรุณากรอกชื่อ", "error")
                        }
                        else if(this.form.email === ""){
                            this.errors = 'email required'
                            this.$swal("ข้อมูลผิดพลาด", "กรุณากรอกอีเมลล์", "error")
                        }
                        else if(this.form.password === ""){
                            this.errors = 'password required'
                            this.$swal("ข้อมูลผิดพลาด", "กรุณากรอกรหัสผ่าน", "error")
                        }
                        else if(this.form.confirmPassword === ""){
                            this.errors = 'confirm password required'
                            this.$swal("ข้อมูลผิดพลาด", "กรุณายืนยันรหัสผ่าน", "error")
                        }
                        else if(this.form.position === ""){
                            this.errors = 'position required'
                            this.$swal("ข้อมูลผิดพลาด", "กรุณากรอกตำแหน่ง", "error")
                        }
                        else if(this.form.department === ""){
                            this.errors = 'department required'
                            this.$swal("ข้อมูลผิดพลาด", "กรุณากรอกแผนก", "error")
                        }
                        else if(this.form.password !== this.form.confirmPassword){
                            this.errors = 'password invalid'
                            this.$swal("ข้อมูลผิดพลาด", "ยืนยันรหัสผ่านผิด", "error")
                        }
                        this.clearForm()
                    }
                }
            });
        },
        async putData(newUser){
            await AdminStore.dispatch('createUser',newUser)
            this.$swal("เพิ่มผู้ใช้สำเร็จ","ข้อมูลผู้ใช้ถูกต้อง", "success")
            this.$router.push('/user')
        },
        clearForm() {
            this.form = {
                name: this.form.name,
                email: this.form.email,
                password: "",
                confirmPassword: "",
                position: this.form.position,
                department: this.form.department,
                role:this.form.role,
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