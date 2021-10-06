<template>
  <div id="app" class="container">
    <!-- <Header></Header> -->
    <Login></Login>
  </div>
</template>

<script>
import Login from './views/Login.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: { Login },
}
</script>


<style lang="scss"></style>
