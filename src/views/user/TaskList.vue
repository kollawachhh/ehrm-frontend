<template>
    <div class="container h-screen bg-content">
        <Header></Header>
        <div class="flex flex-wrap w-screen h-3/4">
            <div class="mx-auto mt-8 h-full bg-gray-300 rounded-md">
                <div class="flex bg-primary px-28 py-5 rounded-t-md">
                    <span class="font-th text-white text-xl mx-auto">ตุลาคม - 2021</span>
                </div>
                <div class="flex bg-gray-300 rounded-b-md mt-5 h-5/6 overflow-y-scroll">
                    <table class="mx-2">
                        <thead>
                            <tr class="font-th w-80 text-md">
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">วันที่</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาเข้า</span></th>
                                <th class="w-20 border-l-2 border-primary"><span class="mx-auto">เวลาออก</span></th>
                                <th class="w-20 border-l-2 border-r-2 border-primary"><span class="mx-auto">เวลารวม</span></th>
                            </tr>
                        </thead>
                        <tbody class="border-t-4 border-primary">
                            <tr class="font-eng border-t-2 border-primary text-sm h-24">
                                <td class="text-center">01/09/2564</td>
                                <td class="text-center"> - </td>
                                <td class="text-center"> - </td>
                                <td class="text-center">00 : 00<span class="font-th"> ชม.</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Footer tab='tasks'></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
    name:'TaskList',
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss" scoped>

</style>