import axios from "axios";

const baseURL = "/pomodoros/api";

const axiosInstance = axios.create({
	baseURL: baseURL,
});

export default axiosInstance;
