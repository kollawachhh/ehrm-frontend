import Axios from 'axios'

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    async getLogs(id) {
        try{
            let res = await Axios.get(`${api_endpoint}/api/logs/${id}`)
            return res
        }catch (e){
            
        }

    }
}