import axios from "axios"
import { getToken }  from "../utils/auth"

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
        console.log(`BISCUIT ID = ${biscuitId}`)
        console.log('Response from biscuitShow:', res.data) 
        return res.data
    } catch (error) {
        console.log('Error in biscuitShow:', error)
        throw error
    }
    }




export const biscuitCreate = async (formData) => {
    console.log('BISCUIT CREATE BISCUIT SERVICE')
    console.log(formData)
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post(`${BASE_URL}/`, formData,{
            headers: {
            Authorization: `Bearer ${getToken()}`,
            // 'Content-Type': 'application/json',
        }})
        return res.data
    } catch(error) {
    throw error
    }
    }


    export const biscuitUpdate = async(biscuitId, formData) => {

        // eslint-disable-next-line no-useless-catch
        try {
            const res = await axios.put(`${BASE_URL}/${biscuitId}/`, formData, {
                headers: {
                Authorization: `Bearer ${getToken()}`,
         
            }})
return res.data
    }catch(error) {
        throw error
    }
    }


    export const biscuitDelete = async(biscuitId) => {

        // eslint-disable-next-line no-useless-catch
        try {
            console.log(`BISCUIT ID ${biscuitId}`)
            const res = await axios.delete(`${BASE_URL}/${biscuitId}/`,{
                headers: {
                Authorization: `Bearer ${getToken()}`,
        }})
    return res.data  
}catch(error) {
    throw error
}
}