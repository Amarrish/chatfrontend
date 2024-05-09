import { BASE_URL} from './Baseurl';
import {commonAPI} from './commonApi';

// register
export const registerAPI = async (user) => {
    try {
      const response = await commonAPI("POST", `${BASE_URL}/user/register`, user, "");
      // console.log(response);
      return response;
    } catch (error) {
      console.error("registerAPI error:", error.message || error);
      throw error;
    }
  };

  export const loginApi = async(user) =>{
    try {
        const response = await commonAPI("POST", `${BASE_URL}/user/login`,user,"");
        return response
    } catch (error) {
       console.error("loginApi error", error.message || error) 
       throw error;
    }
  }

  export const logoutApi = async () => {
    try {
      const response = await commonAPI("POST", `${BASE_URL}/user/logout`, "", {});
      console.log(response); // Log the entire response object
      return response;
    } catch (error) {
      console.error("logoutApi error", error.message || error);
      throw error;
    }
  };

  export const getuserApi = async (reqHeader)=>{
    try {
      const response = await commonAPI("GET",`${BASE_URL}/user/usersidebar`,"",reqHeader);
      // console.log('getuserApi',response);
      return response
    } catch (error) {
      console.error("getuserApi error::", error.message || error);
      throw error;
    }
  }

  export const sendmessageApi = async (reciverid,reqbody,reqHeader)=>{
    try{
      const response = await commonAPI("POST",`${BASE_URL}/user/send/${reciverid}`,reqbody,reqHeader)
      // console.log(response);
      return response
    }catch(err){
      console.error('sendmessageapi error', err.message || err);
      throw err;
    }
  }


export const getmessageApi = async (senderid,reqHeader)=>{
  try {
    const response = await commonAPI("GET",`${BASE_URL}/user/getmessage/${senderid}`,'',reqHeader)
    return response
  } catch (error) {
    console.error('sendmessageapi error', error.message || error);
      throw error;
  }
}