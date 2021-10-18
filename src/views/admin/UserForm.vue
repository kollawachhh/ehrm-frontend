<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex flex-wrap w-screen h-3/4">
        <div class="mx-auto mt-8 h-full w-10/12 bg-gray-300 rounded-md">
            <div class="flex bg-primary py-5 rounded-t-md">
                <button @click="backPage" class="font-th ml-5 text-xl px-2 mr-16 text-white">&#60;</button>
                <span class="font-th text-white ml-7 text-xl">เพิ่มผู้ใช้</span>
            </div>
            <div class="bg-gray-300 rounded-b-md pb-1">
                <form @submit.prevent="submit">
                    <div class="pl-6 pt-5" >
                        <span class="flex font-th pb-1">ชื่อ</span>
                        <input v-model="form.name" type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกชื่อ">
                        <p class="text-red-500" v-if="!$v.form.name.minLength">name must have at least {{ $v.form.name.$params.minLength.min }} letters</p>
                        <div v-if="errors">
                            <p class="text-red-500" v-if="!$v.form.name.required">name is required</p>
                        </div>
                        
                    </div>
                    <div class="pl-6 py-4">
                        <span class="flex font-th pb-1">อีเมลล์</span>
                        <input v-model="form.email" type="email" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกอีเมลล์ผู้ใช้">
                        <div v-if="errors">
                            <p class="text-red-500" v-if="!$v.form.email.required">email is required</p>
                        </div>
                    </div>
                    <span class="font-th ml-6">รหัสผ่าน</span>
                    <div class="flex w-11/12">
                        <div class="pl-6">
                            <input v-model="form.password" type="password" class="p-2 font-th w-full rounded-md" placeholder="กรอกรหัสผ่าน">
                        </div>
                        <div class="ml-5">
                            <input v-model="form.confirmPassword" type="password" class="p-2 font-th w-full rounded-md" placeholder="ยืนยันรหัสผ่าน">
                        </div>
                        
                    </div>
                    <div v-if="errors" class="ml-6">
                        <p class="text-red-500" v-if="!$v.form.password.required">password is required</p>
                        <p class="text-red-500" v-if="!$v.form.password.minLength">password must have at least {{ $v.form.password.$params.minLength.min }} letters</p>
                    </div>
                    <div class="ml-6">
                        <p class="text-red-500" v-if="!$v.form.confirmPassword.sameAsPassword">Passwords must be identical</p>
                    </div>
                    
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">ตำแหน่ง</span>
                        <input v-model="form.position" type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกตำแหน่งของผู้ใช้">
                        <div v-if="errors">
                            <p class="text-red-500" v-if="!$v.form.position.required">position is required</p>
                        </div>
                    </div>
                    <div class="pl-6 pt-4">
                        <span class="flex font-th pb-1">แผนก</span>
                        <input v-model="form.department" type="text" class="p-2 font-th w-11/12 rounded-md" placeholder="กรอกแผนกของผู้ใช้">
                        <div v-if="errors">
                            <p class="text-red-500" v-if="!$v.form.department.required">department is required</p>
                        </div>
                    </div>
                    <div class="font-eng pl-6 pt-4">
                        <span class="flex pb-1">role</span>
                        <select 
                            v-model="form.role"
                            class="p-2 w-11/12 rounded-md" name="" id="">
                            <option v-for="(role, index) in roles" :value="role.name" :key="index">
                                {{role.name}}
                            </option>
                        </select>
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
import { required, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            errors: false,
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
            ]
        }
    },
    validations: {
        form:{
            name: {
                required,
                minLength: minLength(3)
            },
            email:{
                required
            },
            password:{
                required,
                minLength: minLength(8)
            },
            confirmPassword: {
                sameAsPassword: sameAs('password')
            },
            position:{
                required
            },
            department:{
                required
            },
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
                            this.clearForm()
                    }
                    else{
                        this.errors = !this.$v.form.$anyError;
                        this.$swal("ข้อมูลไม่ถูกต้อง", "กรุณาลองอีกครั้ง", "error")
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
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                position: "",
                department: "",
                role:'user',
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