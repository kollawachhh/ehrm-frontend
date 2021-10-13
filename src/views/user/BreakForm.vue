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
                        <textarea v-model="form.reason" name="" id="" cols="30" rows="5" placeholder="เขียนเหตุผลการลางาน" class="font-th w-11/12 p-2 text-xs"></textarea>
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">ตั้งแต่วันที่</span>
                        <input v-model="form.startDate" type="date" placeholder='วันที่ลางาน' class="flex font-eng bg-white w-11/12 mb-2 p-1">
                        <span class="flex font-th pb-2">ถึง</span>
                        <input v-model="form.endDate" type="date" placeholder='วันที่ลางาน' class="flex font-eng bg-white w-11/12 mb-2 p-1">
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
import Leave from '@/store/Leave'

export default {
    data() {
        return {
            form: {
                type: "",
                reason: "",
                startDate: "",
                endDate: "",
                total: "",
                id: "",
            },
            role:'',
        }
    },
    mounted(){
        if (!this.isAuthen()) {
            this.$swal("คุณไม่มีสิทธิ์เข้าถึง", "กรุณาเข้าสู่ระบบ", "warning")
            this.$router.push("/login")
        }
    },
    methods:{
        leaveTotalDay(startDate, endDate) {
            // var Difference_In_Time = date2.getTime() - date1.getTime();
            // // To calculate the no. of days between two dates
            // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            
            // //To display the final no. of days (result)
            // document.write("Total number of days between dates  <br>"
            //    + date1 + "<br> and <br>" 
            //    + date2 + " is: <br> " 
            //    + Difference_In_Days);
        },
        async submit(){
            let payload = {
                date_start: this.startDate,
                date_end: this.endDate,
                type: this.type,
                leave_dates: this.total,
                cause: this.reason,
                user_id: this.id
            }
            Leave.dispatch("leaves", payload);
            this.clearForm();
            this.$router.push('/break')
        },
        clearForm() {
            this.form = {
                type: "",
                reason: "",
                startDate: "",
                endDate: "",
                total: "",
                id: "",
            }
        },
        isAuthen() {
            if(AuthUser.getters.user != null){
                if(AuthUser.getters.user.is_admin === 1){
                    this.role = 'Admin'
                }
                return AuthUser.getters.isAuthen
            }
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