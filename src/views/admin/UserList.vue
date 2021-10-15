<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-3/4">
            <div class="mx-auto mt-8 h-full bg-gray-300 rounded-md">
                <div class="flex bg-primary py-5 rounded-t-md">
                    <a href="/home" class="font-th ml-5 text-xl px-2 mr-16 text-white">&#60;</a>
                    <span class="font-th text-white ml-3 text-xl">รายการผู้ใช้</span>
                </div>
                <div class=" bg-gray-300 rounded-b-md h-5/6 ">
                    <div class="flex h-7 ml-2 my-5">
                        <input type="text" placeholder="ค้นหาผู้ใช้" class="flex font-th w-40 px-3 mr-2 rounded-md">
                        <button type="submit" class="font-th text-white px-5 bg-primary rounded-md">ค้นหา</button>
                        <a href="/userForm" class="px-3 py-1 ml-1 font-th text-white bg-secondary rounded-md">เพิ่มผู้ใช้</a>
                    </div>
                    <table class="mx-2 h-full">
                        <thead class="flex border-b-4 border-primary">
                            <tr class="font-th w-80 text-md">
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">ไอดี</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">ชื่อผู้ใช้</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">ชื่อ</span></th>
                                <th class="w-20 border-l-2 border-r-2 border-primary"><span class="mx-auto">เข้าใช้ล่าสุด</span></th>
                            </tr>
                        </thead>
                        <div class="flex w-80 h-full overflow-y-scroll">
                            <tbody class="w-80 h-5/6 overflow-y-scroll">
                                <button class="w-full" @click="getDetail">
                                    <tr class="flex font-eng border-b-2 border-primary text-sm">
                                        <td class="text-center w-1/4">000001</td>
                                        <td class="text-center w-1/4">User 1</td>
                                        <td class="text-center w-1/4">Name Sun</td>
                                        <td class="text-center w-1/4">08:29:30</td>
                                    </tr>
                                </button>
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
export default {
    name:'UserList',
    components: {
        Header,
        Footer
    },
    methods:{
        async getDetail(){
            this.$router.push('/userDetail')
        },
    },
}
</script>

<style lang="scss" scoped></style>