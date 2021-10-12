<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex flex-wrap w-screen">
        <div class="mx-auto mt-8">
            <div class="bg-primary px-28 py-5 rounded-t-md">
                <span class="font-th text-white text-xl">ลงบันทึกลางาน</span>
            </div>
            <div class="bg-gray-300 rounded-b-md pb-4">
                <form @submit.prevent="submit">
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">ประเภทการลางาน</span>
                        <Dropdown
                            :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}]"
                            v-on:selected="validateSelection"
                            v-on:filter="getDropdownValues"
                            :disabled="false"
                            name="zipcode"
                            :maxItem="10"
                            placeholder="เลือกประเภทการลา"
                            class="font-th ">
                        </Dropdown>
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">เหตุผลการลางาน</span>
                        <textarea name="" id="" cols="30" rows="5" placeholder="เขียนเหตุผลการลางาน" class="font-th w-11/12 p-2 text-xs"></textarea>
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">ตั้งแต่วันที่</span>
                        <input type="date" placeholder='วันที่ลางาน' class="flex font-eng bg-white w-11/12 mb-2 p-1">
                        <span class="flex font-th pb-2">ถึง</span>
                        <input type="date" placeholder='วันที่ลางาน' class="flex font-eng bg-white w-11/12 mb-2 p-1">
                        <span class="font-th">เป็นเวลา 0 วัน</span>
                    </div>
                    <button type="submit" class=" flex font-th bg-primary text-white px-3 py-1 rounded-md mx-auto mt-28">ยืนยัน</button>
                </form>
            </div>
        </div>
        
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Dropdown from 'vue-simple-search-dropdown';
import AuthUser from '@/store/AuthUser'
export default {
    data() {
        return {
            form: {
                type: "",
                reason: "",
                startDate: "",
                endDate: "",
                total: "",
            }
        }
    },
    mounted(){
        if (!this.isAuthen()) {
            this.$swal("คุณไม่มีสิทธิ์เข้าถึง", "กรุณาเข้าสู่ระบบ", "warning")
            this.$router.push("/")
        }
    },
    methods:{
        async submit(){
            this.$router.push('/break')
        },
        clearForm() {
            this.form = {
                type: "",
                reason: "",
                startDate: "",
                endDate: "",
                total: "",
            }
        },
        isAuthen() {
            if (AuthUser.getters.user != null)
            return AuthUser.getters.isAuthen
        }
    },
    name:'BreakForm',
    components:{
        Header,
        Footer,
        Dropdown,
    }
}
</script>

<style scoped></style>