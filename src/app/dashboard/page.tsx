"use client";

import SideBar from '@/components/fragments/SideBar'
import { useToast } from '@/hooks/use-toast';
import React, { useEffect } from 'react';

const Dashboard = () => {
  const { toast } = useToast();

  // check if user is admin
  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      if (role !== "admin") {
        toast({
          title: "Admin only!",
          variant: "destructive",
        });
        window.location.href = "/";
      }
    }
  });

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