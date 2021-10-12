<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-4/5">
            <div class="mx-auto mt-6 h-5/6">
                <div class="bg-primary px-28 py-5 rounded-t-md">
                    <span class="font-th text-white text-xl">กันยายน - 2021</span>
                </div>
                
                <div class="bg-gray-300 rounded-b-md h-full py-3">
                    <div v-if="role === 'Admin'" class="flex ml-4 mt-3">
                        <input type="text" placeholder="ค้นหาผู้ใช้" class="flex font-th text-primary w-56 px-3 mr-3 rounded-md">
                        <button type="submit" class="font-th text-white px-6 bg-primary rounded-md">ค้นหา</button>
                    </div>
                    <div class="overflow-scroll" v-bind:class="{'h-5/6 mt-5':role === 'Admin','h-full mt-0':role !== 'Admin'}">
                        <div class="pb-2">
                            <span class="flex font-th pl-4">ลาป่วย</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">เหตุผล : มีไข้สูง</span>
                                <span class="flex mb-3">ระยะเวลา : 3 วัน</span>
                                <span class="flex">วันที่ : 3 - 5 วัน</span>
                            </div>
                        </div>
                        <div class="pb-2">
                            <span class="flex font-th pl-4">ลาป่วย</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">เหตุผล : มีไข้สูง</span>
                                <span class="flex mb-3">ระยะเวลา : 3 วัน</span>
                                <span class="flex">วันที่ : 3 - 5 วัน</span>
                            </div>
                        </div>
                        <div class="pb-2">
                            <span class="flex font-th pl-4">ลาป่วย</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">เหตุผล : มีไข้สูง</span>
                                <span class="flex mb-3">ระยะเวลา : 3 วัน</span>
                                <span class="flex">วันที่ : 3 - 5 วัน</span>
                            </div>
                        </div>
                        <div class="pb-2">
                            <span class="flex font-th pl-4">ลาป่วย</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">เหตุผล : มีไข้สูง</span>
                                <span class="flex mb-3">ระยะเวลา : 3 วัน</span>
                                <span class="flex">วันที่ : 3 - 5 วัน</span>
                            </div>
                        </div>
                        <div class="pb-2">
                            <span class="flex font-th pl-4">ลาป่วย</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">เหตุผล : มีไข้สูง</span>
                                <span class="flex mb-3">ระยะเวลา : 3 วัน</span>
                                <span class="flex">วันที่ : 3 - 5 วัน</span>
                            </div>
                        </div>
                        <div class="pb-2">
                            <span class="flex font-th pl-4">ลาป่วย</span>
                            <div class="w-11/12 bg-white font-th mx-auto rounded-md border-primary border-2 p-2">
                                <span class="flex mb-3">เหตุผล : มีไข้สูง</span>
                                <span class="flex mb-3">ระยะเวลา : 3 วัน</span>
                                <span class="flex">วันที่ : 3 - 5 วัน</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <Footer tab='breaks'></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
    props:[
        'role',
    ],
    name:'BreakList',
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss" scoped>

</style>