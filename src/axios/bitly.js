import axios from 'axios'

// create an axios instance
const instance = axios.create({
  baseURL: 'https://api-ssl.bitly.com',
  // timeout: 15000
  // crossdomain: true
})

export default instance