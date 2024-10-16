export const getUser=()=>{
    const data=JSON.parse(localStorage.getItem("userInfo")||null);
    return data?.token;
}