// import useClientFetch from "@/utils/client-fetching";
// import { CategoryResponse } from "@/types/category";

// export function useCategories() {
//   const { data, error, isLoading } = useClientFetch<CategoryResponse>("/categories", {
//     sort_direction: "asc"
//   });

//   // Extract the data array from the response
//   const categories = data?.data || [];

//   return { 
//     data: categories, 
//     error, 
//     isLoading 
//   };
// }

import useClientFetch from "@/utils/client-fetching";
import { CategoryResponse } from "@/types/category";

export function useCategories() {
  const { data, error, isLoading } = useClientFetch<CategoryResponse>("/categories", {
    sort_direction: "asc"
  });

  return { 
    data: data?.data || [], // Directly return the array of categories
    error, 
    isLoading 
  };
}