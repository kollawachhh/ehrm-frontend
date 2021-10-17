import Axios from 'axios'
import AuthService from '@/services/AuthService'

const auth_key = "auth-ehrm"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    async getLeaves() {
        let url = `${api_endpoint}/api/leaves/mine`;
        let headers = AuthService.getApiHeader();
        try {
            let res = await Axios.get(url, headers)
            return res
        } catch (e) {

        }
    },

    getUser() {
        return user
    },
    async addLeaves({ startDate, endDate, type, totalDate, reason }) {
        console.log("worked")
        try {
            let url = `${api_endpoint}/api/user/create-leave`
            let body = {
                date_start: startDate,
                date_end: endDate,
                type: type,
                leave_dates: totalDate,
                cause: reason,
                status: status
            }
            let headers = AuthService.getApiHeader();
            let res = await Axios.post(url, body, headers)
            console.log(res)
            if (res.status === 201) {
                let leave = {
                    leave: res.data
                }
                localStorage.setItem(auth_key, JSON.stringify(leave))
                return res.data
            } else {
                console.log("NOT 200", res)
            }
        } catch (e) {

        }
    },
    async getAllLeaves() {
        let url = `${api_endpoint}/api/leaves`;
        let headers = AuthService.getApiHeader();
        console.log(headers)
        try {
            let res = await Axios.get(url, headers)
            return res.data
        } catch (e) {

        }
    },
    async getLeavesByDate(date) {
        let url = `${api_endpoint}/api/leaves/by-date/${date}`
        let headers = AuthService.getApiHeader();
        try {
            let res = await Axios.get(url, headers)
            return res.data
        } catch (e) {

        }
    },
    async getWaitingLeaves() {
        try {
            let url = `${api_endpoint}/api/leaves/waiting`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header)
            return res
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },
    async getWaitingLeavesById(id) {
        try {
            let url = `${api_endpoint}/api/leaves/waiting/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header)
            return res
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },
    async updateStatusLeave(id, status) {
        try {
            let url = `${api_endpoint}/api/leaves/waiting/update-status/${id}`;
            let body = {
                id: id,
                status: status
            }
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, body, header)
            return res
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },
}