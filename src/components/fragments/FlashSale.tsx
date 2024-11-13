"use client";

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import baseApi from '@/app/libs/baseApi/BaseApi';
import Image from 'next/image';
import { useCart } from '@/app/libs/context/CartContext';

interface Product {
  id: number;
  title: string;
  price: GLfloat;
  url: string;
}



const FlashSale = () => {
  const { data: items, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await baseApi.get("products/limit/5");
      return response.data.data;
    }
  });

  const { addToCart } = useCart();
  return (
    <>
       <div className="lg:p-16 md:p-12 sm:p-4">
        <h2 className='font-bold italic w-40 h-12 text-white rounded-xl bg-[#CC071B] p-2 flex justify-center items-center'>Flash Sale</h2>
        <div className='lg:w-full md:w-[560px] sm:w-96 bg-[#CC071B] md:h-[450px] h-96 mt-[-10px] rounded-xl'>
        <Carousel className='p-8'>
          {isLoading && <p>Loading...</p>}
            <CarouselContent className="flex justify-center gap-4 items-center repeat-infinite">
              {items && items.map((item: Product) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 bg-white rounded-xl shadow-md">
                  <Image src={item.url} alt={item.title} className="w-[164px] h-[164px] ml-20" width={487} height={487} />
                  <div className='flex flex-col gap-2 p-2 ml-[0px] mt-12'>
                    <h1 className='font-bold text-black text-xl'>{item.title}</h1>
                    <h1 className='font-medium text-black text-lg'>${item.price}</h1>
                    <div className=''>
                      <button onClick={() => addToCart({ ...item, quantity: 1 })}>Buy now</button>
                    </div>
                  </div>
              </CarouselItem>
          ))}
           </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        </div>
       </div>
    </>
  )
}

export default FlashSale