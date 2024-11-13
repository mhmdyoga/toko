"use client";

import SideBar from "@/components/fragments/SideBar";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import baseApi from "@/app/libs/baseApi/BaseApi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UploadProduct from "@/components/fragments/UploadProduct";
import { Trash2Icon } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  url: string;
  createAt: string;
  updatedAt: string;
  authorId: number;
  category: string;
  onClick: () => void;
}

const ProductPage = () => {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await baseApi.get("products");
      return response.data.data;
    },
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
  });

  const handleRole = () => {
    const validateRole = localStorage.getItem("role");
    if(validateRole !== "admin"){
      toast({
        title: "admin only!",
        variant: "destructive"
      });
      window.location.href = "/";
    }
   }

   handleRole();

  const deleteProduct = async(id: number) => {
    try {
      const response = await baseApi.delete(`products/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-row gap-20">
      <div>
        <SideBar />
      </div>
      <div className="p-0">
      <ScrollArea className="h-[520px] w-[1050px] rounded-md border p-4">
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="w-[150px]">image</TableHead>
              <TableHead className="w-[150px]">title</TableHead>
              <TableHead className="w-[150px]">price</TableHead>
              <TableHead className="w-[150px]">category</TableHead>
              <TableHead className="w-[150px]">description</TableHead>
              <TableHead className="w-[200px]">AuthorId</TableHead>
              <TableHead className="w-[250px]"></TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {products &&
              products.map((item: Product) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={64}
                      height={64}
                    />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.authorId}</TableCell>
                  <TableCell>
                    <Button variant={"ghost"} onClick={() => deleteProduct(item.id)} className="font-bold">
                      <Trash2Icon className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        </ScrollArea>
         <UploadProduct />
      </div>
    </div>
  );
};
export default ProductPage;
