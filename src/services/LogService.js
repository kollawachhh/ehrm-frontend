import Axios from 'axios'
import AuthUser from '@/store/AuthUser'
const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    async getLogs(id) {
        try{
            let res = await Axios.get(`${api_endpoint}/api/logs/${id}`)
            return res
        }catch (e){
            
        }

    },
    // async addTimeIn(time){
    //     let url = api_endpoint + "/api/user/start-work"
    //     let user = AuthUser.getters.user
    //     let body = {
    //         start_time = time,
    //         user_id = user.id,
    //         date = ""
    //     }
    //     try {
    //         let headers = AuthService.getApiHeader()
    //         let res = await Axios.post(url, body, headers)
    //         if(res.status === 200) {
    //           return {
    //             success: true,
    //             data: res.data
    //           }
    //         } else {
    //           console.error(res)
    //           return {
    //             success: false,
    //             message: "Unknown status code: " + res.status
    //           }
    //         }
    //       } catch(e) {
    //         if(e.response.status === 403) {
    //           console.error(e.response.data.message)
    //           return {
    //             success: false,
    //             message: e.response.data.message
    //           }
    //         } else {
    //           return {
    //             success: false,
    //             message: "Unknown error: " + e.response.data
    //           }
    //         }
    //     }
    // }       
}
    