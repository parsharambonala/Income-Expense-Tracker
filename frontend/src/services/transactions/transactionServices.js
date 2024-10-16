import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUser } from "../../utils/getUser";

const token=getUser();

export const addTransactionAPI=async({type, category, date, description,amount})=>{
    const response=await axios.post(`${BASE_URL}/transactions/create`,{
        type,
        category,
        date,
        description,
        amount,
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const listTransactionsAPI=async({category,type,startDate,endDate})=>{
    const response=await axios.get(`${BASE_URL}/transactions/lists`,{
        params:{
            category,
            type,
            startDate,
            endDate,
        },
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data;
}

export const deleteTransactionAPI=async(id)=>{
    
    const response=await axios.delete(`${BASE_URL}/transactions/delete/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const getTransactionAPI=async(id)=>{
    const response=await axios.get(`${BASE_URL}/transactions/get-transaction/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data;
}

export const updateTransactionAPI=async({type,amount,category,date,description,params})=>{
    
    const response=await axios.put(`${BASE_URL}/transactions/update/${params}`,{
        type,
        amount,
        category,
        date,
        description
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}