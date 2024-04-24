import axios from "axios";
import { BASE_URL } from "./baseUrl";

// Register User
export const registerUser = async (endpoint: string, payload: any) => {
  try {
    const response = await postMethod(endpoint, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

//Timein
export const timeIn = async (endpoint: string, payload: any) => {
  try {
    const response = await postMethod(endpoint, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

// User Login
export const UserLogin = async (endpoint: string, payload: any) => {
  try {
    const response = await postMethod(endpoint, payload);
    return response;
  } catch (error) {
    console.error("Error in UserLogin", error);
    throw error;
  }
};

// Update User Details
export const updateUserDetails = async (endpoint: string, payload: any) => {
  try {
    const response = await putMethod(endpoint, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

// timeOut
export const timeOut = async (endpoint: string, payload: any) => {
  try {
    const response = await putMethod(endpoint, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get Login User Details
export const UserDetails = async (endpoint: string) => {
  try {
    const response = await getMethod(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get AttendanceHistory User Details
export const AttendanceHistory = async (endpoint: string) => {
  try {
    const response = await getMethod(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get AttendanceStatus User Details
export const AttendanceStatus = async (endpoint: string, params: any = {}) => {
  try {
    const response = await getMethod(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

// SignIn
export const signIn = async (endpoint: string, payload: any) => {
  try {
    const response = await postMethod(endpoint, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

// SignOut
export const signOut = async (endpoint: string, payload: any) => {
  try {
    const response = await putMethod(endpoint, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

// Delete User
export const deleteUser = async (endpoint: string) => {
  try {
    const response = await deleteMethod(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};


//....leaveTypes
export const LeaveTypes = async (endpoint: any) => {
  try {
      const response = await getMethod(endpoint);
      return response;
  } catch (error) {
      throw error;
  }
}

//....LEavRequest

export const RequestLeave = async (endpoint: any, payload: any) => {
  try {
      const response = await postMethod(endpoint, payload);
      return response;
  } catch (error) {
      throw error;
  }
}

// Post method
const postMethod = async (endpoint: string, payload: any) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, payload);
    return response;
  } catch (error) {
    console.error("Error in postMethod", error);
    throw error;
  }
};

// Get method
const getMethod = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Put method
const putMethod = async (endpoint: string, payload: any) => {
  try {
    const response = await axios.put(`${BASE_URL}${endpoint}`, payload);
    return response;
  } catch (error) {
    console.error("Error in putMethod", error);
    throw error;
  }
};

// Delete method
const deleteMethod = async (endpoint: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}${endpoint}`);
    return response;
  } catch (error) {
    console.error("Error in deleteMethod", error);
    throw error;
  }
};
