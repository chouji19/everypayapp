import React from "react";
import clienteAxios from "../config/axios";
import addApiKey, { tokenAuth } from "../config/headerAdd";
import AsyncStorage from '@react-native-community/async-storage';


export const validateCustomerCode = async (data) => {
    try {
      addApiKey();
      const result = await clienteAxios.post("/customer/validatecode", data);
      if (result.data.token) {
        AsyncStorage.setItem("tokenCustomer", result.data.token);
        return {
          success: result.data.success,
          data: result.data,
        };
      } else {
        return {
          success: false,
          msg: "Code validation failed, please try again",
        };
      }
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error: "Code validation failed, please try again",
      };
    }
  };


  export const loginCustomerEP = async (data) => {
    try {
      addApiKey();
      //console.log('calling login')
      const result = await clienteAxios.post("/auth/logincustomer", data);
      if (result.data.token) {
        await AsyncStorage.setItem("tokenCustomer", result.data.token);
        return {
          success: true,
          token: result.data.token,
          changePassword: result.data.changepassword,
          connectionvalid: result.data.connectionvalid
        };
      } else {
        return {
          success: false,
          error: "Username or password not valid, please try again",
        };
      }
    } catch (error) {
      //console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error: "Login failed please try again",
      };
    }
  };

  export const validateCustomerEmail = async (data) => {
    try {
      addApiKey();
      console.log('calling login')
      const result = await clienteAxios.post("/customer/validateemail", data);
      console.log(result);
      if (result.data.success) {
        return {
          success: true,
          userfirstlogin: result.data.userfirstlogin,
        };
      } else {
        return {
          success: false,
          error: "Username not valid, please try again",
        };
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error: "Login failed please try again",
      };
    }
  };

  export const updateCustomerPassword = async (token, password) => {
    try {
      tokenAuth(token);
      addApiKey();
      const dataForUpdate = {
        password,
      };
      //console.log('Enter to change password')
      const resultado = await clienteAxios.put(
        `/customer/updatecustomerpw`,
        dataForUpdate
      );
      return {
        success: resultado.data.success,
        data: resultado.data,
      };
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error:
          "There was an error updating your details, please verify your information and try again",
      };
    }
  };


  export const getCustomerData = async (token) => {
    try {
      tokenAuth(token);
      addApiKey();
      const resultado = await clienteAxios.get(`/customer/getcustomerdataapp`);
  
      return {
        success: resultado.data.success,
        data: resultado.data,
      };
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error: "Error getting the customer data",
      };
    }
  };

  export const updateCustomerStatusByUser = async (token, dataForUpdate) => {
    try {
      tokenAuth(token);
      addApiKey();
      //console.log(id, ' ', status)
      // const dataForUpdate = {
      //   status,
      // };
      const resultado = await clienteAxios.post(
        `/customer/updatemystatus`,
        dataForUpdate
      );
      return {
        success: resultado.data.success,
        data: resultado.data,
      };
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error:
          "There was an error updating your details, please verify your information and try again",
      };
    }
  };

  export const requestGetDailyPayment = async (token) => {
    try {
      tokenAuth(token);
      addApiKey();
      //console.log(id, ' ', status)
      const dataForUpdate = {
        status,
      };
      const resultado = await clienteAxios.get(
        `/payments/requestdailypayment`
      );
      return {
        success: resultado.data.success,
        data: resultado.data,
      };
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error:
          "There was an error updating your details, please verify your information and try again",
      };
    }
  };

  export const createCashBoostPayment = async (token, data) => {
    try {
      tokenAuth(token);
      addApiKey();
      const resultado = await clienteAxios.post(`/payments/createCashBoostPayment`,data);
      return {
        success: resultado.data.success,
        data: resultado.data,
      };
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        msg: 
          "There was not possible to create the payment, verify you have enough budget to make the cash boost request",
        error:
          "There was not possible to create the payment, verify you have enough budget to make the cash boost request",
      };
    }
  };