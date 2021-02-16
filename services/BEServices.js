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
      const result = await clienteAxios.post("/customer/validateemail", data);
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
      console.log(error)
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


  export const validateTokenBE = async (token, data) => {
    try {
      tokenAuth(token);
      addApiKey();
      const resultado = await clienteAxios.post(`/auth/validatetoken`);
      return {
        success: resultado.data.success,
        data: resultado.data.msg,
      };
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        msg: 
          "There was not possible to validate the user ID",
        error:
        "There was not possible to validate the user ID",
      };
    }
  };


  export const messageHelpUser = async (data) => {
    try {
      addApiKey();
      const result = await clienteAxios.post("/utils/sendmessage", data);
  
      return {
        success: result.data.success,
        data: result.data,
      };
    } catch (error) {
      // console.log(error)
      return {
        success: false,
        uncontrolled: true,
        error: "Code validation failed, please try again",
      };
    }
  };

  
  export const getCustomerInfoAppBE = async (token) => {
    try {
      tokenAuth(token);
      addApiKey();
      const resultado = await clienteAxios.get(`/customer/getCustomerInfoApp`);
      return {
        success: resultado.data.success,
        data: resultado.data,
      };
    } catch (error) {
      return {
        success: false,
        uncontrolled: true,
        error: "Error getting the customer data",
      };
    }
  };


  export const validateCustomerExist = async (customer) => {
    try {
      addApiKey();
      const resultado = await clienteAxios.post(
        "/customer/validatecustomer",
        customer
      );
      return resultado.data.validation;
    } catch (error) {
      //console.log(error)
      return false;
    }
  };

  export const saveCustomer = async (customer) => {
    try {
      await AsyncStorage.removeItem("token");
      addApiKey();
      const result = await clienteAxios.post("/customer", customer);
      if (result.data.token) {
        await AsyncStorage.setItem("token", result.data.token);
        return {
          success: true,
          token: result.data.token,
        };
      } else {
        return {
          success: false,
          token: "Error creating the user",
        };
      }
    } catch (error) {
      //console.log(error)
      return {
        success: false,
        token: "Error creating the user",
      };
    }
  };

  export const saveCustomerBasiq = async () => {
    try {
        addApiKey();
        let token = await AsyncStorage.getItem('token');
        if (token) {
            tokenAuth(token);
            const result = await clienteAxios.post('/customerbasiq/createBasiqUser');
            return {
                success: true
            }
        }
        else {
            return {
                success: false,
                token: 'Error creating the user'
            }
        }
    } catch (error) {
        return {
            success: false,
            token: 'Error creating the user'
        }
    }
}

export const updateCustomerData = async (token, dataForUpdate) => {
  try {
    tokenAuth(token);
    addApiKey();
    const resultado = await clienteAxios.put(
      `/customer/updatecustomerdata`,
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
        "There was an error updating your bank, please verify your information and try again",
    };
  }
};

export const createCustomerBank = async (customer, token) => {
  try {
      tokenAuth(token);
      addApiKey();
      const result = await clienteAxios.post('/customerbasiq/createConnectionBasiqUser', customer);
      return {
          success: result.data.success,
          data: result.data
      }
  } catch (error) {
      console.log(error)
      return {
          success: false,
          uncontrolled: true,
          error: 'There was an error logging in with your bank, please verify your information and try again'
      }
  }
}

export const validateCustomerConnectionAndCode = async (data, token) => {
  try {
      tokenAuth(token);
      addApiKey();
      const result = await clienteAxios.post('/customerbasiq/validateConnectionBasiqUser', data);
      return {
          success: result.data.success,
          data: result.data
      }
  } catch (error) {
      // console.log(error)
      return {
          success: false,
          uncontrolled: true,
          error: 'There was an error logging in with your bank, please verify your information and try again'
      }
  }
}

export const processRules = async (token) => {
  try {
    tokenAuth(token);
    addApiKey();
    const resultado = await clienteAxios.post("/customerbasiq/processrules");
    return {
      success: resultado.data.success,
      data: resultado.data,
    };
  } catch (error) {
    // console.log(error)
    return {
      success: false,
      uncontrolled: true,
      error: "There was an error validating your bank, please try again",
    };
  }
};

export const createvalidationcode = async (token) => {
  try {
      tokenAuth(token);
      addApiKey();
      const result = await clienteAxios.post('/customerbasiq/createvalidationcode');
      return {
          success: result.data.success,
          data: result.data
      }
  } catch (error) {
      console.log(error)
      return {
          success: false,
          uncontrolled: true,
          error: ''
      }
  }
}

export const recoverPasswordCustomer = async (email) => {
  try {
    addApiKey();
    const resultado = await clienteAxios.post(
      `/customer/recoverPassword`,
      email
    );
    return {
      success: resultado.data.success,
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      uncontrolled: true,
      error:
        "Email not valid or the user is not active in the app",
    };
  }
};

export const getAccounts = async (token) => {
  try {
      tokenAuth(token);
      addApiKey();
      const result = await clienteAxios.get('/customerbasiq/getAccounts');
      return {
          success: result.data.success,
          data: result.data.data
      }
  } catch (error) {
      // console.log(error)
      return {
          success: false,
          uncontrolled: true,
          error: 'There was an error logging in with your bank, please verify your information and try again'
      }
  }
}

export const updateCustomerBank = async (customer, token) => {
  try {
    tokenAuth(token);
    addApiKey();
    const resultado = await clienteAxios.post(
      "/customer/customerbank/update",
      customer
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
        "There was an error updating your bank, please verify your information and try again",
    };
  }
};