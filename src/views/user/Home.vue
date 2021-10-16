<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex flex-wrap w-screen">
      <div v-if="role !== 'admin'" class="w-screen">
        <a href="/taskForm" class="bg-gray-300 flex mx-auto mt-10 rounded-md w-5/6">
          <img src="icons/task_form_btn.png" alt="" class="flex w-24 h-24 ml-2 my-5">
          <span class="font-th text-2xl ml-5 mt-14">ลงเวลางาน</span>
        </a>
        <a href="/breakForm" class="bg-gray-300 flex mx-auto mt-10 rounded-md w-5/6">
          <img src="icons/break_form_btn.png" alt="" class="flex w-24 h-24 ml-2 my-5">
          <span class="font-th text-2xl ml-5 mt-14">ลางาน</span>
        </a>
        <a v-if="role === 'header'" href="/request" class="bg-gray-300 flex mx-auto mt-10 rounded-md w-5/6">
          <img src="icons/user_request_btn.png" alt="" class="flex w-24 h-24 ml-2 my-5">
          <span class="font-th text-2xl ml-5 mt-14">คำขอลา</span>
        </a>
      </div>
      <div v-if="role === 'admin'" class="w-screen">
        <a href="/user" class="bg-gray-300 flex mx-auto mt-10 rounded-md w-5/6">
          <img src="icons/employee_manage_btn.png" alt="" class="flex w-24 h-24 ml-2 my-5">
          <span class="font-th text-2xl ml-5 mt-14">จัดการข้อมูลผู้ใช้</span>
        </a>
      </div>
     
    </div>
    <Footer tab='home'></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AuthUser from "@/store/AuthUser"

export default {
  name:'Home',
  components: {
    Header,
    Footer
  },
  data() {
      return {
        role: AuthUser.getters.user.role,
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
    
  }
}
</script>

<style scoped></style>
