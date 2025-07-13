import useSWR from "swr";
import { getToken } from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/";

const fetcher = async (url: string) => {
	const token = await getToken();
	const res = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to fetch");
	const data = await res.json();
	return data;
};

export default function useUserFetch<T>(url: string) {
	const { data, error, isLoading, mutate } = useSWR<T>(
		`${API_URL}${url}`,
		fetcher,
		{
			refreshInterval: 30000,
			errorRetryInterval: 5000,
			errorRetryCount: 3,
		}
	);

	return { data, error, isLoading, mutate };
}
