import Axios from 'axios'
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    async getLogs() {
        let url = `${api_endpoint}/api/logs/mine`;
        let headers = AuthService.getApiHeader();
        try{
            let res = await Axios.get(url, headers)
            return res
        }catch (e){
            console.log("can't get logs");
        }

    },
    async addTimeIn(payload) {
        let url = api_endpoint + "/api/user/start-work"
        let headers = AuthService.getApiHeader();
        let body ={
            start_time : payload.time,
            date : payload.date
        }
        try {
          let res = await Axios.post(url, body, headers)
          if(res.status === 200) {
            return {
              success: true,
              data: res.data
            }
          } else {
            console.error(res)
            return {
              success: false,
              message: "Unknown status code: " + res.status
            }
          }
        } catch(e) {
          if(e.response.status === 403) {
            console.error(e.response.data.message)
            return {
              success: false,
              message: e.response.data.message
            }
          } else {
            return {
              success: false,
              message: "Unknown error: " + e.response.data
            }
          }
        }
      },
      async addTimeOut(payload) {
        let url = api_endpoint + "/api/user/end-work"
        let headers = AuthService.getApiHeader();
        let body ={
            end_time : payload.time,
            date : payload.date
        }
        console.log(body)
        try {
        //   let headers = AuthService.getApiHeader()
          let res = await Axios.post(url, body, headers)
          if(res.status === 200) {
            return {
              success: true,
              data: res.data
            }
          } else {
            console.error(res)
            return {
              success: false,
              message: "Unknown status code: " + res.status
            }
          }
        } catch(e) {
          if(e.response.status === 403) {
            console.error(e.response.data.message)
            return {
              success: false,
              message: e.response.data.message
            }
          } else {
            return {
              success: false,
              message: "Unknown error: " + e.response.data
            }
          }
        }
      },
      async getTimeById(id) {
        try {
            let res = await Axios.get(`${api_endpoint}/api/logs/${id}`)
            return res.data
        } catch(e) {
            console.log("can't get time");
        }
      },
      async getAllLogsToday(){
        try{
            let res = await Axios.get(`${api_endpoint}/api/logs`)
            return res
        }catch (e){
            
        }
    }
  }
    
