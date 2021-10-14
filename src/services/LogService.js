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
            
        }

    },
}