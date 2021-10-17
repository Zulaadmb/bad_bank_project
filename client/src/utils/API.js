import axios from "axios";

export const login = data => axios.post("/account/login", data);
export const signup = data => axios.post("/account/create", data);
export const depositFund = data => axios.post("/account/deposit", data);
export const withrawFund = data => axios.post("/account/withdraw", data);
export const getBalance = data => axios.post("/account/balance", data);
export const getUserInfo = () => axios.get("/account/info");
export const getAllHistory = (user) => axios.get("/account/all/" + user);