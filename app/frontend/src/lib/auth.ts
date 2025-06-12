let authToken: string | null = null;

export const setToken = (token: string) => {
	authToken = token;
};

export const getToken = () => {
	return authToken;
};

export const clearToken = () => {
	authToken = null;
};
