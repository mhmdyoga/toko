"use client";
import SideBar from "@/components/fragments/SideBar";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import baseApi from "@/app/libs/baseApi/BaseApi";
import { toast } from "@/hooks/use-toast";


interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createAt: string;
  updatedAt: string;
  onClick: () => void;
}


const UserPage = () => {
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await baseApi.get("users");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleRole = () => {
      const validateRole = localStorage.getItem("role");
      if (validateRole !== "admin") {
        toast({
          title: "Admin only!",
          variant: "destructive",
        });
        window.location.href = "/";
      }else {
        window.location.href = "/dashboard";
      }
    };

    handleRole();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await baseApi.delete(`users/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row gap-20">
      <div>
        <SideBar />
      </div>
      <div className="span-0">
        <Table>
          <TableCaption>A list of your users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="w-[200px]">Username</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[200px]">Role</TableHead>
              <TableHead className="w-[150px]">CreatedAt</TableHead>
              <TableHead className="w-[150px]">UpdatedAt</TableHead>
              <TableHead className="text-right w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.createAt}</TableCell>
                <TableCell>{user.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="z-50">...</PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2 text-left">
                      <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserPage;
