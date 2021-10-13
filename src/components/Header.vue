<template>
    <nav class="wrapper">
        <h1 class="flex font-eng font-bold text-white text-9xl h-1/4 ml-5 mr-auto mt-6 sm:text-3xl ">EHRM</h1>
        <div>{{ this.user.name }}</div>
        <img src="icons/user_test_img.png" alt="" class="rounded-full bg-white h-16 w-16 ml-auto mr-5 my-3">
    </nav>
    
</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
        data() {
        return {
            user: {
                name: "",
                position: "",
            }
        }
    },
    created() {
        this.user.name = AuthUser.getters.user.name;
        this.user.position = AuthUser.getters.user.position;
    },
    methods: {
        // logout() {
        //     AuthUser.dispatch('logout')
        //     this.$router.push('/')
        // }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    @apply flex justify-center text-center bg-primary
}
</style>