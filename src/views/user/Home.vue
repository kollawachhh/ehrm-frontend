<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex flex-wrap w-screen">
      <a href="/taskForm" class="bg-gray-300 flex mx-auto mt-10 rounded-md w-5/6">
        <img src="icons/task_form_btn.png" alt="" class="flex w-24 h-24 ml-2 my-5">
        <span class="font-th text-2xl ml-5 mt-14">ลงเวลางาน</span>
      </a>
      <a href="/breakForm" class="bg-gray-300 flex mx-auto mt-10 rounded-md w-5/6">
        <img src="icons/break_form_btn.png" alt="" class="flex w-24 h-24 ml-2 my-5">
        <span class="font-th text-2xl ml-5 mt-14">ลางาน</span>
      </a>
    </div>
    <Footer tab='home'></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name:'Home',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped></style>
