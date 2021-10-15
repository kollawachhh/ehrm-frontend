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
                        <select v-model="form.type" name="type" id="types" class="flex mr-5 p-1 w-11/12 bg-white font-th">
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
                        <date-picker v-model="form.startDate" type="date" 
                        :default-value="new Date()" :disabled-date="notBeforeToday" @change="change"
                         placeholder='วันที่ลางาน' 
                        :clearable=false 
                        class="center bg-white w-11/12 mb-2 p-1 font-th"></date-picker>
                        <span class="flex font-th pb-2">ถึง</span>
                        <date-picker v-if="this.disableDatePicker" @change="getTotalDate" v-model="form.endDate" type="date" 
                        :default-value="new Date()" :disabled-date="notBeforeTodaySelect" 
                        value-type="format" placeholder='วันที่ลางาน' 
                        :clearable=false disabled
                        class="center font-th bg-white w-11/12 mb-2 p-1"></date-picker>
                        <date-picker v-if="!this.disableDatePicker" @change="getTotalDate" v-model="form.endDate" type="date" 
                        :default-value="new Date()" :disabled-date="notBeforeTodaySelect" 
                        value-type="format" placeholder='วันที่ลางาน' 
                        :clearable=false
                        class="center font-th bg-white w-11/12 mb-2 p-1"></date-picker>
                        <br>
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AuthUser from '@/store/AuthUser'
import Leave from '@/store/Leave'
import moment from 'moment'

export default {
    components: { DatePicker },
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
            disableDatePicker: true,
            role:'',
            types:[
                    {name: "ลาป่วย", id: "sick_leave"},
                    {name: "ลากิจ", id: "personal_leave"},
                    {name: "ลาพักร้อน", id: "vacation_leave"},
                    {name: "ลาคลอด", id: "maternity_leave"}
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
        change() {
            this.disableDatePicker = false;
        },
        notBeforeToday(date) {
            return date < new Date(new Date());
        },
        // notBeforeTodaySelect(date) {
        //     console.log(this.form.startDate)
        //     console.log(date)
        //     return new Date(new Date()) < this.form.startDate;
        // },
        notBeforeTodaySelect(date) {
            return date < this.form.startDate;
        },
        async submit(){
            if (this.form.type !== null && 
            this.form.reason !== null &&
            this.form.startDate !== null &&
            this.form.endDate !== null &&
            this.form.totalDate !== 0 &&
            this.form.id !== null) {
                this.form.startDate = moment(this.form.startDate).format("YYYY-MM-DD")
                await Leave.dispatch("leaves", this.form);
                this.clearForm();
                this.$swal("ทำรายการสำเร็จ", `คุณได้ทำการลางานเรียบร้อย`, "success")
                this.$router.push('/break')
            } else {
                this.$swal("ทำรายการไม่สำเร็จ", `กรุณากรอกข้อมูลให้ครบถ้วน`, "warning")
            }
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
                } else {
                    this.form.id = AuthUser.getters.user.id
                }
                return AuthUser.getters.isAuthen
            }
        },
        async backPage(){
            this.$router.go(-1)
        },
        getTotalDate(){
            this.form.totalDate = moment(this.form.endDate).diff(moment(this.form.startDate), 'days')+1

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