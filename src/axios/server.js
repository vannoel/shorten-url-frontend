import axios from 'axios'

// create an axios instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  // timeout: 15000
  // crossdomain: true
})

export default instance