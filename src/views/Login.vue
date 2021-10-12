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
              <p class="font-th text-black text-1xl w-4/5 m-auto pt-3 pb-1">ชื่อผู้ใช้</p>
              <input class="flex items-center w-4/5 h-10 m-auto rounded-md px-3" 
                type="text"
                v-model="form.username"
                placeholder="กรอกชื่อผู้ใช้"
              >
            </div>
            <div class="h-20">
              <p class="font-th text-black text-1xl w-4/5 m-auto pt-3 pb-1">รหัสผ่าน</p>
              <input class="flex items-center w-4/5 h-10 m-auto rounded-md px-3" 
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
            }
        }
  },
  components: { Header },
  methods: {
        async login() {
            console.log(this.form);
            if (this.form.username == null || this.form.password == null || this.form.username == "" || this.form.password == "") {
              this.$swal("กรุณากรอกข้อมูลให้ครบ", "ตรวจสอบให้แน่ใจว่าใส่ข้อมูลครบทุกช่อง", "error")
            }
            else {
              let res = await AuthUser.dispatch('login', this.form)
              console.log(res);
              if (res.success) {
                this.$swal("ลงชื่อเข้าใช้สำเร็จ", `Welcome, ${res.user.username}`, "success")
                this.$router.push('/home')
              }
              else {
                this.$swal("ชื่อผู้ใช้หรือรหัสผ่านผิด", res.message, "error")
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