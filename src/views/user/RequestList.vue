<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-3/4">
            <div class="mx-auto mt-8 h-full bg-gray-300 rounded-md">
                <div class="flex bg-primary py-5 rounded-t-md">
                    <button @click="backPage" class="font-th ml-5 text-xl px-2 mr-10 text-white">&#60;</button>
                    <span class="font-th text-white ml-5 text-xl">รายการคำขอลา</span>
                </div>
                <div class=" bg-gray-300 rounded-b-md h-5/6 ">
                    <table class="mt-3 mx-2 h-full">
                        
                        <thead class="w-full flex border-b-4 border-primary">
                            <tr class="flex font-th w-80 text-md">
                                <th class="w-2/12 border-l-2 border-primary"><span class="mx-auto">ไอดี</span></th>
                                <th class="w-5/12 border-l-2 border-primary"><span class="mx-auto">ชื่อ</span></th>
                                <th class="w-5/12 border-l-2 border-r-2 border-primary"><span class="mx-auto">ส่งคำขอล่าสุด</span></th>
                            </tr>
                        </thead>
                        <div class="flex w-80 h-full pt-2 pb-5 overflow-y-scroll">
                            <tbody class="w-80 overflow-y-scroll">
                                    <tr class="flex font-eng border-b-2 border-primary  text-sm">
                                        <button class="flex w-full py-2" @click="getDetail()">
                                            <td class="text-center w-2/12">123</td>
                                            <td class="text-center w-5/12">Name Sun</td>
                                            <td class="text-center w-5/12">00/00/00 00:00 น.</td>
                                        </button>
                                    </tr>
                            </tbody>
                        </div>
                    </table>
                </div>
            </div>
        </div>
        <Footer tab='none'></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import moment from 'moment'

export default {
    name:'RequestList',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            allRequest: [],
        }
    },
    methods:{
        async getDetail(){
            this.$router.push('/request/'+ 1)
        },
        async backPage(){
            this.$router.go(-1)
        },
        getLoginTime(time){
            return moment(time).format("DD-MM-YYYY HH:mm:ss")
        },
    },
}
</script>

<style lang="scss" scoped></style>