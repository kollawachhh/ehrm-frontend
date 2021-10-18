<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex mt-6 w-screen">
        <div class="mx-auto w-10/12">
            <div class="bg-primary py-5 rounded-t-md">
                <button @click="backPage" class="font-th ml-5 mr-10 text-xl px-2 text-white">&#60;</button>
                <span class="font-th ml-4 text-white text-xl">ลงบันทึกเวลางาน</span>
            </div>
            <div class="bg-gray-300 rounded-b-md pb-4">
                <div class="flex">
                    <img src="icons/user_test_img.png" alt="" class="mt-5 mx-5 w-28 h-28 rounded-full bg-white">
                    <div class="py-11">
                        <span class="font-th font-bold text-lg">{{ this.user.name }}</span>
                        <br>
                        <span class="font-eng text-sm">{{ this.user.position }}</span>
                        <br>
                        <span class="font-eng text-sm">{{ this.user.department }}</span>
                    </div>
                </div>
                <hr class="flex w-80 mx-auto mb-5 border-1 border-white">
                    <div class="flex w-80 bg-white mb-6 pt-1 mx-auto rounded-md">
                        <span class="font-th pl-3 pr-2">เวลาเข้า</span>
                        <button 
                            v-if="this.form.taskIn === '00:00'"
                            @click="setTaskInNow" 
                            class="font-th text-center text-white bg-primary px-5 py-3 rounded-md font-2xl border mx-5 my-5 font-bold">
                            ลงเวลาเข้างาน
                        </button>
                        <p 
                            v-if="this.form.taskIn !== '00:00'"
                            class="font-th text-center w-3/6 text-primary text-3xl mx-3 py-2 rounded-md font-2xl my-5 font-bold">
                            {{this.form.taskIn}} น.
                        </p>
                        <img src="icons/task_in.png" alt="" class="w-8 h-8 ml-8">
                    </div>
                    <div class="flex w-80 bg-white mb-6 pt-1 mx-auto rounded-md">
                        <span class="font-th pl-3">เวลาออก</span>
                        <button
                            :disabled="this.form.taskIn ==='00:00'"
                            v-if="this.form.taskOut === '00:00'"
                            @click="setTaskOutNow"                            
                            class="font-th text-center text-white bg-primary px-4 py-3 rounded-md font-2xl border mx-5 my-5 font-bold"
                            v-bind:class="{'bg-gray-300':this.form.taskInNow === false}">
                            ลงเวลาออกงาน
                        </button>
                        <p
                            v-if="this.form.taskOut !== '00:00'"
                            class="font-th w-3/6 text-center text-primary text-3xl mx-3 py-2 rounded-md font-2xl my-5 font-bold">
                            {{this.form.taskOut}} น.
                        </p>
                        <img src="icons/task_out.png" alt="" class="w-8 h-8 ml-7">
                    </div>
                    <div class="flex w-80 bg-white mx-auto rounded-md mb-10">
                        <span class="font-th pl-3 py-2">
                            เวลาทำงานรวม
                            <span  
                                class="font-eng text-primary text-2xl px-8">
                                {{this.form.totalTime}}
                            </span>
                            ชม.
                        </span>
                    </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import AuthUser from '@/store/AuthUser'
import moment from 'moment'
import LogStore from '@/store/Log'
export default {
    data() {
        return {
            times:[],
            form: {
                taskIn: "00:00",
                taskOut: "00:00",
                totalTime: "00:00",
                taskInNow: false,
                taskOutNow: false,
            },
            user: {
                name: "",
                position: "",
                department: "",
            },
            role: '',
        }
    },

    async created() {
        await this.filterUserData()
        this.user.name = AuthUser.getters.user.name;
        this.user.position = AuthUser.getters.user.position;
        this.user.department = AuthUser.getters.user.department;
    },
    mounted(){
        if (!this.isAuthen()) {
            this.$swal("คุณไม่มีสิทธิ์เข้าถึง", "กรุณาเข้าสู่ระบบ", "warning")
            this.$router.push("/")
        }
    },
    methods:{
        async submit(){
            this.$router.push('/task')
        },
        async setTaskInNow(){
            this.form.taskInNow = true
            this.form.taskIn = moment().format('HH:mm')
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = moment().format('HH:mm:ss')
            let payload={
                time: time,
                date: date
            }
            await LogStore.dispatch("addTimeIn",payload)
        },
        async setTaskOutNow(){
            this.form.taskOutNow = true
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = moment().format('HH:mm:ss')
            let payload={
                time: time,
                date: date
            }
            await LogStore.dispatch("addTimeOut",payload)
            this.filterUserData()
        },
        clearForm() {
            this.form = {
                taskIn: "",
                taskOut: "",
                totalTime: "",
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
        async filterUserData(){
            let logs = await LogStore.dispatch("getLogs")
            logs.data.forEach(log => { 
                if(moment(log.date, "YYYY-MM-DD").isSame(moment().format("YYYY-MM-DD"))){
                    this.form.taskIn = moment(log.login_time, "HH:mm:ss").format("HH:mm")
                    this.form.taskOut = moment(log.logout_time, "HH:mm:ss").format("HH:mm")
                    this.form.totalTime = moment(log.total_hours, "HH:mm:ss").format("HH:mm")
                    if(this.form.taskIn !== '00:00'){
                        this.form.taskInNow = true
                    }
                }
            });
        },
        
        async backPage(){
            this.$router.go(-1)
        },
    },
    name:'TaskForm',
    components:{
        VueTimepicker,
        Header,
        Footer,
    },
    taskIn: {
        HH: "",
        mm: "",
    },
    taskOut: {
        HH: "",
        mm: "",
    },
}
</script>

<style scoped></style>