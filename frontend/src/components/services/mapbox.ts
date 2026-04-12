import API from "../../api";


export const saveHistory = async (data: any) => {
  return await API.post("/history", data); 
};

export const getHistory = async (email: string) => {
  return await API.get(`/history/${email}`); 
};

export const getLatestHistory = async (email: string) => {
  return await API.get(`/history/latest/${email}`);
};