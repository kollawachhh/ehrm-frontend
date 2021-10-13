import Axios from 'axios'

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    async getLeaves(id) {
        try{
            let res = await Axios.get(`${api_endpoint}/api/leaves/${id}`)
            console.log(res)
            return res
        }catch (e){
            
        }

    }
}