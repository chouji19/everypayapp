import  clientAxiosIllions from './axios';

export const addApiKey = ()=> {
    clientAxiosIllions.defaults.headers.common['X-API-KEY'] = 'a888bb7c-4996-4dd4-b872-0328962db53d';
}

export const validateKeyAuth = (apiValue) => {
    return process.env.EXPRESS_APIKEY === apiValue;
}

export const tokenAuth = token =>{
    if(token){
        clientAxiosIllions.defaults.headers.common['x-auth-token'] = `${token}`;
    }else{
        delete clientAxiosIllions.defaults.headers.common['x-auth-token'];
    }
}



export default addApiKey;

