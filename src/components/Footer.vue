<template>
  <div class="flex flex-wrap absolute bottom-0 w-full">
    <nav class="w-full">
      <ul class="flex mb-0 list-none flex-wrap flex-row rounded-t-xl bg-primary">
        <li class="last:mr-0 flex-auto text-center">
          <a href="/home" class="font-th text-xs font-bold border-2 border-primary px-8 py-2 rounded-tl-xl block leading-normal" v-bind:class="{'text-white bg-primary': tab !== 'home', 'text-white bg-secondary': tab === 'home'}">
            <div v-if="tab === 'home'">
              <img src="icons/home_btn_hover.png" alt="" class="w-10 h-10 mx-auto">
            </div>
            <div v-else>
              <img src="icons/home_btn.png" alt="" class="w-10 h-10 mx-auto">
            </div>
            หน้าหลัก
          </a>
        </li>
        <li class="last:mr-0 flex-auto text-center">
          <a href="/task" class="font-th text-xs font-bold border-2 border-primary px-5 py-2 block leading-normal" v-bind:class="{'text-white bg-primary': tab !== 'tasks', 'text-white bg-secondary': tab === 'tasks'}">
            <div v-if="tab === 'tasks'">
              <img src="icons/task_list_btn_hover.png" alt="" class="w-10 h-10 mx-auto">
            </div>
            <div v-else>
              <img src="icons/task_list_btn.png" alt="" class="w-10 h-10 mx-auto">
            </div>
            
            ประวัติลงงาน
          </a>
        </li>
        <li class="last:mr-0 flex-auto text-center">
          <a href="/break" class="font-th text-xs font-bold border-2 border-primary px-5 py-2 rounded-tr-xl block leading-normal" v-bind:class="{'text-white bg-primary': tab !== 'breaks', 'text-white bg-secondary': tab === 'breaks'}">
            <div v-if="tab === 'breaks'">
              <img src="icons/break_list_btn_hover.png" alt="" class="w-10 h-10 mx-auto">
            </div>
            <div v-else>
              <img src="icons/break_list_btn.png" alt="" class="w-10 h-10 mx-auto">
            </div>
            ประวัติลางาน
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props:['tab'],
  data() {
    return {
      openTab: 1
    }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    }
  }
}
</script>