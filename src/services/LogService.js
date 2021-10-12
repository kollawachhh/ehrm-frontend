import Axios from 'axios'

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    async getLogs() {
        try{
            let res = await Axios.get(`${api_endpoint}/api/logs`)
            return res.data
        }catch (e){
            
        }

    }
}