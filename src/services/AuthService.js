import Axios from "axios"

const auth_key = "auth-ehrm"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
// const jwt = auth ? auth.jwt : ""

const api_endpoint = process.env.VUE_APP_EHRM_ENDPOINT || "http://localhost:8000"

export default {
    // isAuthen() {
    //     return (user !== "") && (jwt !== "")
    // },

    // getApiHeader() {
    //     if (this.jwt !== undefined && this.jwt !== "") {
    //         return {
    //             headers: {
    //                 Authorization: `Bearer ${this.jwt}`
    //             }
    //         }
    //     } else {
    //         this.jwt = JSON.parse(localStorage.getItem(auth_key)).jwt
    //         return {
    //             headers: {
    //                 Authorization: `Bearer ${this.jwt}`
    //             }
    //         }
    //     }
    // },

    // isRoleAuthenticated() {
    //     return this.isAuthen() && user.role.name === "Authenticated"
    // },


    getUser() {
        return user
    },

    // getJwt() {
    //     return jwt
    // },

    async login({ password, username }) {
        // call POST /auth/local
        try {
            // let url = api_endpoint + "/auth/local"
            let url = `${api_endpoint}/api/login`
            let body = {
                email: username,
                password: password
            }
            let res = await Axios.post(url, body)
            console.log(res)
            if (res.status === 200 && res.data !== 'out') {
                let user = {
                    user: res.data
                }
                localStorage.setItem(auth_key, JSON.stringify(user))
                // this.jwt = res.data.jwt
                // console.log(this.jwt)
                return {
                    success: true,
                    user: res.data,
                    // jwt: res.data.jwt
                }
            } else if (res.data == "out") {
                return {
                    sucess: false,
                    user: "failed"
                }
            } else {
                console.log("NOT 200", res)
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

    // async register({ username, email, password }) {
    //     // call POST /auth/local/register
    //     try {
    //         let url = `${api_endpoint}/auth/local/register`
    //         let body = {
    //             username: username,
    //             email: email,
    //             password: password
    //         }
    //         let res = await Axios.post(url, body)
    //         if (res.status === 200) {
    //             localStorage.setItem(auth_key, JSON.stringify(res.data))
    //             return {
    //                 success: true,
    //                 user: res.data.user,
    //                 jwt: res.data.jwt
    //             }
    //         } else {
    //             console.log("NOT 200", res)
    //         }
    //     } catch (e) {
    //         if (e.response.status === 400) {
    //             console.error(e.response.data.message[0].messages[0].message)
    //             return {
    //                 success: false,
    //                 message: e.response.data.message[0].messages[0].message
    //             }
    //         } else {
    //             console.error(e.response)
    //             return {
    //                 success: false,
    //                 message: "Unknown error: " + e.response.data
    //             }
    //         }
    //     }
    // },

    // async update({ id, total_points, max_points }) {
    //     console.log(id, total_points, max_points)
    //     try {
    //         // let url = api_endpoint + "/users/" + id
    //         let url = `${api_endpoint}/users/${id}`
    //         let body = {
    //             total_points: total_points,
    //             max_points: max_points,
    //         }
    //         let headers = this.getApiHeader()
    //         let res = await Axios.put(url, body, headers)
    //         let newData = {
    //             jwt: this.jwt,
    //             user: res.data
    //         }
    //         if (res.status === 200) {
    //             localStorage.setItem(auth_key, JSON.stringify(newData))
    //             return {
    //                 success: true,
    //                 user: newData.user,
    //                 jwt: newData.jwt
    //             }
    //         } else {
    //             console.log("NOT 200", res)
    //         }
    //     } catch (e) {
    //         console.error(e.response)
    //     }
    // }
}