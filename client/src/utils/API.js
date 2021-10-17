import axios from "axios";

export const login = data => axios.post("/account/login", data);
export const signup = data => axios.post("/api/sign_up", data);
export const posting = data => axios.post("/api/post", data);
export const deletePost = id => axios.delete("/api/post/" + id);
export const getPublicPosts = () => axios.get("/api/posts");
export const userPublicPosts = nickname => axios.get("/api/posts/public/" + nickname);
export const userPrivatePosts = nickname => axios.get("/api/posts/private/" + nickname);
export const allPosts = nickname => axios.get('/api/allposts/' + nickname);
export const getPublicNotifications = nickname => axios.get('/api/getpublicnotifications/' + nickname);
export const updateNotification = (id, nickname) => axios.put('/api/updatenotification/' + nickname + "/" + id);
export const getUsers = nickname => axios.get('/api/getallusers/' + nickname);
export const getChatHistory = nickname => axios.get('/api/getchat/' + nickname);
export const writeChatToDB = data => axios.post("/api/writeChat", data);