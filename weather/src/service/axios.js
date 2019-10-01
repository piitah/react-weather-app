import axios from 'axios'

const instance = axios.create({
    baseURL: "https://my-react-burger-3f4a6.firebaseio.com"
})

export default instance