<template>
  <div class="bg-primary h-screen overscroll-auto">
      <!-- <Header></Header> -->
      <div class="h-80">
          <h1 class="font-eng text-7xl text-white text-center pt-40">EHRM</h1>
          <p class="font-eng text-white text-center pt-2">Electronic Human Resource Management</p>
      </div>
      <div class=" w-4/6 h-80 bg-gray-300 m-auto rounded-2xl">
        <div class="h-20 bg-blue-400 rounded-t-2xl">
            <p class="font-thai text-2xl text-white text-center pt-5">ลงชื่อเข้าใช้</p>
        </div>
        <div class="h-40">
          <div class="h-20">
            <p class="font-thai text-black text-1xl w-4/5 m-auto pt-3 pb-1">ชื่อผู้ใช้</p>
            <input class="flex items-center w-4/5 h-10 m-auto rounded-md px-3" type="text">
          </div>
          <div class="h-20">
            <p class="font-thai text-black text-1xl w-4/5 m-auto pt-3 pb-1">รหัสผ่าน</p>
            <input class="flex items-center w-4/5 h-10 m-auto rounded-md px-3" type="password">
          </div>
        </div>
        <div class="h-20">
          <button type="submit" class="font-thai flex text-white px-3 py-1 mx-auto mt-6 rounded-xl bg-blueGray-400">ยืนยัน</button>
        </div>
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
}
</script>

<style lang="scss" scoped></style>