"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import baseApi from "../libs/baseApi/BaseApi";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from 'lucide-react';
import { useCart } from "../libs/context/CartContext";

const Products = () => {
  const {
    data: items,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await baseApi.get("products");
      return response.data.data;
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  const { addToCart } = useCart();

  return (
    <div className="md:p-32 p-8 md:mt-0 mt-8">
      <div>
        {isLoading && (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 lg:gap-4 md:gap-3 gap-2">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        )}
        {isError && <p>Failed to fetch data.</p>}
        {items && items.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 lg:gap-4 md:gap-3 gap-1">
            {items.map((item) => (
              <div
                className="flex flex-col gap-2 bg-[#fff] border border-black shadow-xl rounded-xl"
                key={item.id}
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  width={268}
                  height={187}
                />
                <div className="flex flex-col gap-2 text-left p-6 items-start">
                  <h1 className="font-bold text-left text-xl">{item.title}</h1>
                  <h1 className="font-medium text-left text-lg">${item.price}</h1>
                </div>
                <div className="p-4">
                  <button onClick={() => addToCart(item)} className="bg-[#111111ce] w-16 flex justify-center items-center h-8 text-white font-medium text-lg p-5 rounded-md">
                    <ShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <p>No items found.</p>
        )}
      </div>
    </div>
  );
};
interface Product {
  id: number;
  title: string;
  price: GLfloat;
  url: string;
  quantity: number
  // Add other properties as needed
}

export default Products;
