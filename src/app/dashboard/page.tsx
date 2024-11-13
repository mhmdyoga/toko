"use client";

import SideBar from '@/components/fragments/SideBar'
import { useToast } from '@/hooks/use-toast';
import React from 'react';

const Dashboard = () => {
  const { toast } = useToast();

  // check if user is admin
   const handleRole = () => {
    const validateRole = localStorage.getItem("role");
    if(validateRole !== "admin"){
      toast({
        title: "admin only!",
        variant: "destructive"
      });
      window.location.href = "/"
    }
   }

   handleRole();


  return (
    <div className="flex flex-row gap-20 ">
      <div>
        <SideBar />
      </div>
      <div className='p-16'>
        <h2>Dashboard</h2>
      </div>
    </div>
  )
}

export default Dashboard