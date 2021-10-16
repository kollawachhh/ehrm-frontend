<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-3/4">
            <div class="mx-auto mt-8 h-full w-10/12 bg-gray-300 rounded-md">
                <div class="flex bg-primary py-5 rounded-t-md">
                    <button @click="backPage" class="font-th ml-5 text-xl px-2 mr-16 text-white">&#60;</button>
                    <span class="font-th text-white ml-3 text-xl">ข้อมูลคำขอลา</span>
                </div>
                <div class="flex bg-gray-300 my-5 w-full rounded-b-md">
                    <img src="/icons/user_test_img.png" alt="" 
                         class="w-32 h-32 rounded-full mx-3 bg-white">
                    <div class="font-th text-primary leading-9 my-2">
                        <div class="flex">ชื่อ<p class="ml-10 mr-2">:</p>{{`Name Sun`}} </div>
                        <div class="flex">ตำแหน่ง<p class="ml-1 mr-2">:</p>{{`Developer`}} </div>
                        <div class="flex">แผนก<p class="ml-5 mr-2">:</p>{{`IT department`}} </div>
                    </div>
                </div>
                <hr class="flex w-80 mx-auto border-1 border-white">
                <div class="h-3/6 my-4 overflow-scroll">
                    <div class="font-th mx-10">
                        <div class="flex">ประเภท<p class="ml-5 mr-2 mb-5">:</p>{{`ลากิจ`}}</div>
                        <div class="flex">เหตุผล<p class="ml-6 mr-2 mb-5">:</p>{{`ไปกินข้าวที่ต่างจังหวัด, ไปดำน้ำดูปะการังที่หัวหิน, ไปดูหนังที่สยาม, ไปงานวันเกิดแม่เพื่อน`}}</div>
                        <div class="flex">วันที่<p class="ml-10 mr-2 mb-5">:</p>{{`3 - 5 กันยายน 2564`}}</div>
                        <div class="flex">ระยะเวลา<p class="ml-3 mr-2">:</p>{{`3 วัน`}}</div>
                    </div>
                </div>
                <div class="flex font-th text-white">
                    <button @click="submit(true)" class="bg-primary mx-auto rounded-md px-3 py-1">ยืนยัน</button>
                    <button @click="submit(false)" class="bg-red-500 mx-auto rounded-md px-3 py-1">ปฏิเสธ</button>
                </div>
            </div>
        </div>
        <Footer tab='none'></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    data() {
        return {
            user_id: this.$route.params.id,
            currentUser:[],
        }
    },
    name:'RequestDetail',
    components: {
        Header,
        Footer
    },
    methods:{
        async backPage(){
            this.$router.go(-1)
        },
        async submit(type){
            if(type){
                this.$fire({
                title: 'ยืนยันใช่หรือไม่',
                text: "คุณต้องการที่จะยืนยันคำขอนี้ใช่ไหม?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
                }).then((r) => {
                    if(r.value){
                        this.$swal("ทำการยืนยันคำขอเรียบร้อย!", ``, "success")
                        this.$router.push('/request')
                    }
                });
            }
            else{
                this.$fire({
                title: 'ปฏิเสธใช่หรือไม่',
                text: "คุณต้องการที่จะปฏิเสธคำขอนี้ใช่ไหม?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่',
                }).then((r) => {
                    if(r.value){
                        this.$swal("ทำการปฏิเสธคำขอเรียบร้อย!", ``, "success")
                        this.$router.push('/request')
                    }
                });
            }
        }
    },
}
</script>

<style lang="scss" scoped></style>