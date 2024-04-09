import axios from "axios";

const baseURL =
	process.env.NODE_ENV === "development" ? "/api" : "/pomodoros/api";

const axiosInstance = axios.create({
	baseURL: baseURL,
});

export default axiosInstance;
