<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex flex-wrap w-screen">
        <div class="mx-auto mt-8 w-10/12">
            <div class="bg-primary py-5 rounded-t-md">
                <button @click="backPage" class="font-th ml-5 mr-10 text-xl px-2 text-white">&#60;</button>
                <span class="font-th ml-5 text-white text-xl">ลงบันทึกลางาน</span>
            </div>
            <div class="bg-gray-300 rounded-b-md pb-4">
                <form @submit.prevent="submit">
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">ประเภทการลางาน</span>
                        <select v-model="form.type" name="type" id="types" class="flex mr-5 p-1 w-11/12 bg-white">
                            <option value="" disabled selected hidden>เลือกประเภท</option>
                            <option 
                                v-for="(type, index) in types" :key="index" :value='type.name' >
                            {{ type.name }}
                            </option>
                        </select>
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">เหตุผลการลางาน</span>
                        <textarea v-model="form.reason" name="" id="" cols="30" rows="5" placeholder="เขียนเหตุผลการลางาน" class="font-th w-11/12 p-2 text-xs"></textarea>
                    </div>
                    <div class="pl-6 pt-5">
                        <span class="flex font-th pb-2">ตั้งแต่วันที่</span>
                        <input v-model="form.startDate" type="date" placeholder='วันที่ลางาน' class="flex font-eng bg-white w-11/12 mb-2 p-1">
                        <span class="flex font-th pb-2">ถึง</span>
                        <input @change="getTotalDate" v-model="form.endDate" type="date" placeholder='วันที่ลางาน' class="flex font-eng bg-white w-11/12 mb-2 p-1">
                        <span class="font-th">เป็นเวลา {{form.totalDate}} วัน</span>
                    </div>
                    <button  type="submit" class=" flex font-th bg-primary text-white px-3 py-1 rounded-md mx-auto mt-28">ยืนยัน</button>
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
import AuthUser from '@/store/AuthUser'
import Leave from '@/store/Leave'
import moment from 'moment'

export default {
    data() {
        return {
            form: {
                type: "",
                reason: "",
                startDate: "",
                endDate: "",
                totalDate: 0,
                id: "",
            },
            role:'',
            types:[
                {
                    id: 1,
                    name: "ลาป่วย",
                },
                {
                    id: 2,
                    name: "ลาหยุด",
                },
            ],
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
        },
        async backPage(){
            this.$router.go(-1)
        },
        getTotalDate(){
            this.form.totalDate = moment(this.form.endDate).diff(moment(this.form.startDate), 'days')
        }
    },
    name:'BreakForm',
    components:{
        Header,
        Footer,
    }
}
</script>

<style scoped></style>