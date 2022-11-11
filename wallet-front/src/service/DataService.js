import axios from "axios";

const API_URL = "http://localhost:8080/wallet";

export const getAllWallets = () => {
  return axios.get(`${API_URL}`);
};

export const getWallet = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const deleteWallet = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const addWallet = (wallet) => {
  return axios.post(`${API_URL}`, wallet);
};

export const addFunds = (id, amount) => {
  return axios.post(`${API_URL}/${id}/funds/add/${amount}`);
};

export const removeFunds = (id, amount) => {
  return axios.post(`${API_URL}/${id}/funds/remove/${amount}`);
};

export const transferFunds = (fromId, toId, amount) => {
  return axios.post(`${API_URL}/${fromId}/transfer/${toId}funds/${amount}`);
};
