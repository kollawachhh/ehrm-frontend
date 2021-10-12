<template>
  <div class="container h-screen bg-content">
    <Header></Header>
    <div class="flex mt-6 w-screen h-4/5">
        <div class="mx-auto h-5/6">
            <div class="bg-primary px-28 py-5 rounded-t-md">
                <span class="font-th text-white text-xl">ลงบันทึกเวลางาน</span>
            </div>
            <div class="bg-gray-300 rounded-b-md pb-4">
                <div class="flex">
                    <img src="icons/user_test_img.png" alt="" class="mt-5 mx-5 w-28 h-28 rounded-full bg-white">
                    <div class="py-11">
                        <span class="font-th font-bold text-lg">ประยงค์ จานโอชะ</span>
                        <br>
                        <span class="font-eng text-sm">Margeting</span>
                    </div>
                </div>
                <hr class="flex w-80 mx-auto my-5 border-1 border-white">
                <form @submit.prevent="submit">
                    <div class="flex w-80 bg-white mb-6 pt-1 mx-auto rounded-md">
                        <span class="font-th pl-3 pr-2">เวลาเข้า</span>
                        <vue-timepicker 
                            format="HH:mm A" 
                            close-on-complete 
                            manual-input 
                            v-model="taskIn" 
                            placeholder="--:--" 
                            input-class="font-eng text-center text-primary font-2xl border ml-5 mr-5 my-5 font-bold">
                        </vue-timepicker>
                        <img src="icons/task_in.png" alt="" class="w-8 h-8 ml-12">
                    </div>
                    <div class="flex w-80 bg-white mb-6 pt-1 mx-auto rounded-md">
                        <span class="font-th pl-3">เวลาออก</span>
                        <vue-timepicker 
                            format="HH:mm A" 
                            close-on-complete 
                            manual-input 
                            v-model="taskOut" 
                            placeholder="--:--" 
                            input-class="font-eng text-center text-primary font-2xl border ml-5 mr-5 my-5 font-bold">
                        </vue-timepicker>
                        <img src="icons/task_out.png" alt="" class="w-8 h-8 ml-12">
                    </div>
                    <div class="flex w-80 bg-white mx-auto rounded-md">
                        <span class="font-th pl-3 py-2">
                            เวลาทำงานรวม
                            <span class="font-eng text-primary text-2xl px-8">--:--</span>
                            ชม.
                        </span>
                    </div>
                    <button type="submit" class=" flex font-th bg-primary text-white px-3 py-1 rounded-md mx-auto mt-24">ยืนยัน</button>
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
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
export default {
    data() {
        return {
            form: {
                taskIn: "",
                taskOut: "",
                totalTime: "",
            }
        }
    },
    methods:{
        async submit(){
            this.$router.push('/task')
        },
        clearForm() {
            this.form = {
                taskIn: "",
                taskOut: "",
                totalTime: "",
            }
        }
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