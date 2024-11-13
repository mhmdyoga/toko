"use client";
import baseApi from '@/app/libs/baseApi/BaseApi';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';  
import React, { useState } from 'react'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: '',
    });
    const [isError, setError] = useState('');
    // router
     const router = useRouter();
     const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await baseApi.post('users', formData);
            const data = response.data;
            router.push('/auth/login')
            return data;
        } catch (error) {
            setError((error as { response: { data: { message: string } } }).response?.data?.message);
            toast({
                title: isError,
                description: 'Something went wrong',
                variant: 'destructive',
                duration: 5000,
            })
        }
    };


  return (
    <div className='mt-10 flex justify-center items-center h-screen'>
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center">
        <Image width={32} height={32} className="h-8 w-auto mx-auto" src="https://www.svgrepo.com/show/353414/apple.svg" alt="Apple" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {`Have an account?`}
          <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign In →</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8">

         <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <div className="mt-1">
            <input name="username" value={formData.username} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" id="username" type="text" placeholder="your name" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
          <div className="mt-1">
            <input name="email" value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" id="email" type="email" placeholder="your@email.com" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <div className="mt-1">
            <input name="password" value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" id="password" type="password" placeholder="••••••••" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <div className="mt-1">
            <input name="confPassword" value={formData.confPassword} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" id="password" type="password" placeholder="••••••••" required />
          </div>
        </div>
        <div>
          <button type="submit" className="inline-flex items-center rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base bg-black font-medium text-white hover:bg-gray-800 border border-black focus:ring-black w-full justify-center">Sign Up</button>
        </div>
      </form>
</div>
        </div>
  )
}

export default RegisterPage