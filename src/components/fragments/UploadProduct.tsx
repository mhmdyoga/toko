"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";

  import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import baseApi from '@/app/libs/baseApi/BaseApi';
import { useToast } from '@/hooks/use-toast';

interface FormData {
    formData: () => void
}

const UploadProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [authorId, setAuthorId] = useState("");

     const { toast }= useToast();

    const mutation = useMutation((formData: FormData) => {
        return baseApi.post("products", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        formData.append('authorId', authorId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutation.mutate(formData as any, {
            onSuccess: () => {
                toast({
                  title: 'Success',
                  description: 'Product added successfully',
                })
            },
            onError: () => {
                toast({
                  title: 'Failed create new item',
                  description: 'Something went wrong',
                  variant: "destructive"
                })
            },
        });
    }

  return (
    <>
       <div className="flex flex-row justify-end mx-32">
          <Dialog>
            <DialogTrigger>
              Add Product
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your store.
                </DialogDescription>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <Input type="text" placeholder="example: Nike SB x Otto kathsuiro" value={title} onChange={(e) => setTitle(e.target.value)}/>
                  <label>Price</label>
                  <Input type="text" placeholder="example: 100.49" value={price} onChange={(e) => setPrice(e.target.value)}/>
                  <label>Description</label>
                  <Input type="text" placeholder="example: The best shoes in the world" value={description} onChange={(e) => setDescription(e.target.value)}/>
                  <label>Category</label>
                  <Input type="text" placeholder="example: Shoes" value={category} onChange={(e) => setCategory(e.target.value)}/>
                  <label>Image</label>
                  <Input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}/>
                  <label>AutorId</label>
                  <Input type="text" placeholder="example: 1" value={authorId} onChange={(e) => setAuthorId(e.target.value)}/>
                  <Button variant={"ghost"} className="mt-4 ml-96 font-bold" type="submit">Add</Button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
    </>
  )
}
export default UploadProduct;