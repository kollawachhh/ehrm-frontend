<template>
    <nav class="wrapper">
        <a href="/home" class="flex font-eng font-bold text-white text-9xl h-1/4 p-7 mr-auto sm:text-3xl ">EHRM</a>
        <button @click.prevent="logout" class="flex font-th text-white text-lg px-5">
            <p class="pr-3 pt-7">{{ this.user.name }}</p> 
            <img src="icons/user_test_img.png" alt="" class="rounded-full bg-white h-16 w-16 ml-auto  my-3">
        </button>
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
    components:{

    },
    methods:{
        async logout() {
            this.$fire({
                title: 'กำลังจะออกจากระบบ',
                text: "คุณต้องการออกจากระบบใช่หรือไม่?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
            }).then((r) => {
                console.log(r)
                if(r.value){
                    AuthUser.dispatch('logout')
                    this.$swal("ออกจากระบบแล้ว!", `คุณได้ทำการออกจากระบบ`, "success")
                    this.$router.push('/')
                }
            });
        }
    },
    created() {
        this.user.name = AuthUser.getters.user.name;
        this.user.position = AuthUser.getters.user.position;
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    @apply flex justify-center text-center bg-primary
}
</style>