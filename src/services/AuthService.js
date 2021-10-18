import Axios from "axios"

const auth_key = "auth-ehrm"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    getApiHeader() {
        if (this.jwt !== undefined && this.jwt !== "") {
            return {
                headers: {
                    Authorization: `Bearer ${this.jwt}`
                }
            }
        } else {
            this.jwt = JSON.parse(localStorage.getItem(auth_key)).jwt
            return {
                headers: {
                    Authorization: `Bearer ${this.jwt}`
                }
            }
        }
    },

    getUser() {
        return user
    },

    getJwt() {
        return jwt
    },

    async login({ password, username }) {
        try {
            let url = `${api_endpoint}/api/auth/login`
            let body = {
                email: username,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200 && res.data !== 'out') {
                let user = {
                    jwt: res.data.access_token,
                    user: res.data.user
                }
                localStorage.setItem(auth_key, JSON.stringify(user))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.access_token
                }
            } else if (res.data == "out") {
                return {
                    sucess: false,
                    user: "failed"
                }
            } else {
                console.log("NOT 200", res)
                return {
                    sucess: false,
                    user: "failed"
                }
            }
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

    logout() {
        localStorage.removeItem(auth_key)
    },

}