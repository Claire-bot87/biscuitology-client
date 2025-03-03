import axios from "axios"
// import { getToken }  from "../utils/auth"

const BASE_URL = import.meta.env.VITE_API_URL + '/biscuits'

export const biscuitIndex = async() => {
    try{
        const res = await axios.get(BASE_URL)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
    }


export const biscuitShow = async (biscuitId) => {
    try{
        const res = await axios.get(BASE_URL + `/${biscuitId}`)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
    }


