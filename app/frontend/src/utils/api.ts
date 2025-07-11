import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// api.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("token"); // Or use cookies
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// api.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response?.status === 401) {
// 			window.location.href = "/login";
// 		} else if (error.response?.status === 422) {
// 			const errors = error.response.data.errors;
// 			if (errors) {
// 				for (const errorKey in errors) {
// 					if (Object.hasOwnProperty.call(errors, errorKey)) {
// 						console.error(`${errorKey}: ${errors[errorKey]}`);
// 						// You can also display these errors to the user in a more user - friendly way,
// 						// such as setting them in a state variable for a React component
// 						// or showing a toast message.
// 					}
// 				}
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default api;
