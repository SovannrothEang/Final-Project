// import useSWR from "swr";

// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1";

// interface ApiError extends Error {
//   status?: number;
//   data?: {
//     message?: string;
//     errors?: Record<string, string[]>;
//   };
// }

// const fetcher = async (url: string) => {
//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "", // Add auth token when needed
//     },
//   });

//   if (!res.ok) {
//     const error: ApiError = new Error("Failed to fetch");
//     error.status = res.status;
//     try {
//       error.data = await res.json();
//     } catch (error) {
//       error.data = { message: await res.text() };
//     }
//     throw error;
//   }

//   const response = await res.json();
//   if (!response.success) {
//     const error: ApiError = new Error(response.message || "API request failed");
//     error.data = response;
//     throw error;
//   }

//   return response;
// };

// export default function useFetch<T>(url: string, params?: Record<string, any>) {
//   const queryString = params
//     ? `?${new URLSearchParams(
//         Object.entries(params)
//           .filter(([_, value]) => value !== undefined && value !== null)
//           .reduce((acc, [key, value]) => {
//             acc[key] = String(value);
//             return acc;
//           }, {} as Record<string, string>)
//       ).toString()}`
//     : '';

//   const fullUrl = `${API_URL}${url}${queryString}`;

//   const { data, error, isLoading, mutate } = useSWR<T>(fullUrl, fetcher, {
//     revalidateOnFocus: false,
//     shouldRetryOnError: false,
//   });

//   return {
//     data,
//     error,
//     isLoading,
//     mutate,
//     status: error?.status,
//     errorData: error?.data,
//   };
// }



import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1";

interface ApiError extends Error {
  status?: number;
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "", // Add auth token when needed
    },
  });

  if (!res.ok) {
    const error: ApiError = new Error("Failed to fetch");
    error.status = res.status;
    try {
      error.data = await res.json();
    } catch (err) {  // Changed variable name from 'error' to 'err' to avoid shadowing
      error.data = { message: await res.text() };
	  console.log(err);
    }
    throw error;
  }

  const response = await res.json();
  if (!response.success) {
    const error: ApiError = new Error(response.message || "API request failed");
    error.data = response;
    throw error;
  }

  return response;
};

export default function useFetch<T>(
  url: string,
  params?: Record<string, string | number | boolean | null | undefined>
) {
  const queryString = params
    ? `?${new URLSearchParams(
        Object.entries(params)
          .filter(([, value]) => value !== undefined && value !== null)
          .reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
      ).toString()}`
    : '';

  const fullUrl = `${API_URL}${url}${queryString}`;

  const { data, error, isLoading, mutate } = useSWR<T>(fullUrl, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
    status: error?.status,
    errorData: error?.data,
  };
}