<template>
  <div class="bg-primary h-screen overscroll-auto">
      <div class="h-80">
          <h1 class="font-eng text-7xl text-white text-center pt-40">EHRM</h1>
          <p class="font-eng text-white text-center pt-2">Electronic Human Resource Management</p>
      </div>
      <div class=" w-4/6 h-80 bg-gray-300 m-auto rounded-2xl">
        <div class="h-20 bg-blue-400 rounded-t-2xl">
            <p class="font-th text-2xl text-white text-center pt-5">ลงชื่อเข้าใช้</p>
        </div>
        <form @submit.prevent="login">
          <div class="h-40">
            <div class="h-20">
              <p class="font-th text-black text-1xl w-4/5 m-auto pt-3 pb-1">อีเมลล์
              <span v-if="this.errors === 'fields required' || this.errors === 'email required'" class="text-red-500 font-bold text-lg">!</span></p>
              <input 
                class="flex items-center w-4/5 h-10 m-auto rounded-md px-3" 
                v-bind:class="{'border-2 border-red-500': this.errors === 'fields required' || this.errors === 'email required'}"
                type="text"
                v-model="form.username"
                placeholder="กรอกอีเมลล์"
              >
            </div>
            <div class="h-20">
              <p class="font-th text-black text-1xl w-4/5 m-auto pt-3 pb-1">รหัสผ่าน
              <span v-if="this.errors === 'fields required' || this.errors === 'password required'" class="text-red-500 font-bold text-lg">!</span></p>
              <input 
                class="flex items-center w-4/5 h-10 m-auto rounded-md px-3" 
                v-bind:class="{'border-2 border-red-500': this.errors === 'fields required' || this.errors === 'password required'}"
                type="password"
                v-model="form.password"
                placeholder="กรอกชื่อรหัสผ่าน"
              >
            </div>
          </div>
          <div class="h-20">
            <button type="submit" class="font-thai flex text-white px-3 py-1 mx-auto mt-6 rounded-xl bg-blueGray-400">ยืนยัน</button>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import AuthUser from '../store/AuthUser'

export default {
  data() {
        return {
            form: {
                username: "",
                password: ""
            },
            errors: '',
        }
  },
  components: { Header },
  methods: {
        async login(e) {
            e.preventDefault()
            this.errors = ''
            if (this.form.username == "" || this.form.password == "") {
              if(this.form.username == "" && this.form.password == ""){
                this.errors = 'fields required'
                this.$swal("กรุณากรอกข้อมูลให้ครบ", "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", "error")
              }
              else if(this.form.username == ""){
                this.errors = 'email required'
                this.$swal("กรุณากรอกอีเมลล์", "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", "error")
              }
              else if(this.form.password == ""){
                this.errors = 'password required'
                this.$swal("กรุณากรอกรหัสผ่าน", "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", "error")
              }
              
            }
            else {
              let res = await AuthUser.dispatch('login', this.form)
              if (res.success) {
                this.$swal("ลงชื่อเข้าใช้สำเร็จ", `ยินดีต้อนรับ คุณ ${res.user.name}`, "success")
                this.$router.push('/home')
              }
              else {
                this.errors = 'email or password invalid.'
                this.$swal("ไม่พบชื่อผู้ใช้หรือรหัสผ่าน", "โปรดตรวจสอบชื่อผู้ใช้ หรือรหัสผ่านอีกครั้ง", "error")
                this.clearForm()
              }
            }
            
            
        },
        clearForm() {
            this.form = {
                username: "",
                password: ""
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>