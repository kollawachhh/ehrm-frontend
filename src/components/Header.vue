<template>
    <nav class="wrapper">
        <a href="/home" class="flex font-eng font-bold text-white text-9xl h-1/4 p-7 mr-auto sm:text-3xl ">EHRM</a>
        <button @click.prevent="getDetail" class="flex font-th text-white text-lg px-5">
            <p class="pr-3 pt-7 font-th">{{ this.user.name }}</p> 
            <img :src="this.user.image" alt="" class="rounded-full bg-white h-16 w-16 ml-auto  my-3">
        </button>
    </nav>
    
</template>

<script>
import AuthUser from '@/store/AuthUser'

export default {
        data() {
        return {
            user: {
                name: AuthUser.getters.user.name,
                position: AuthUser.getters.user.position,
                image: AuthUser.getters.user.image,
            }
        }
    },
    components:{

    },
    methods:{
        async getDetail() {
            this.$router.push('/detail')
            this.$root.$emit('event')
        }
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    @apply flex justify-center text-center bg-primary
}
</style>