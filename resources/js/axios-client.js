import axios from 'axios'

const axiosClient = axios.create({
    APP_URL: `${import.meta.env.VITE_API_BASE_URL}/api`
})


axiosClient.interceptors.request.use( (config)=>{
    const token = localStorage.getItem(`ACCESS_TOKEN`)
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
axiosClient.interceptors.response.use((config)=>{
    return config;
}, (error)=>{
    const {response} = error
    if(response.status == 401){
        localStorage.removeItem('ACCESS_TOKEN')

    }
    throw response
})
export default axiosClient;