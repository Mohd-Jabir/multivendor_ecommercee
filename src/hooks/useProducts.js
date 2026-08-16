import { getProducts,getProductById } from "../api/productApi.js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProducts=(params={})=>{
    return useQuery({
        queryKey:["products",params],
        queryFn:()=>getProducts(params),
        placeholderData:keepPreviousData,
    })
}
export const useProduct=(id)=>{
    return useQuery({
        queryKey:["product",id],
        queryFn:()=>getProductById(id),
        enabled:Boolean(id),
    })
}
