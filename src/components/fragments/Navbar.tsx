"use client";

import React, { useEffect, useState } from "react";
import { Paytone_One } from "next/font/google";
import Link from "next/link";
import { HomeIcon, ShoppingBag, UserCircle, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuSquare } from 'lucide-react';
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/app/libs/context/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import baseApi from "@/app/libs/baseApi/BaseApi";
import { useToast } from "@/hooks/use-toast";



const PaytoneOne = Paytone_One({
  weight: ["400"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [isRole, setIsRole] = useState(true);
  const router = useRouter();
  const { toast } = useToast()
  const { Cart, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  useEffect(() => {
    buttonProfile();
  });

  const buttonProfile = () => {
    const role = localStorage.getItem("role");
    if (role) {
      setIsRole(false);
    }
  };

  const LogoutButton = () => {
    localStorage.removeItem("role");
    router.push("/");
  };

  const handleCheckout = async() => {
    try {
      const response = await baseApi.post('/create-transaction', {
        gross_amount: totalPrice
      })

      const { token } = response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ( window as any ).snap.pay(token, {
        onSuccess: function () {
          toast({
            title: "Payment success"
          })
        },
        onPending: function(){
          toast({
            title: "Waiting for payment"
          })
        },
        onError: function(){
          toast({
            title: "Payment Failed"
          })
        },
        onClose: function(){
          toast({
            title: "You abandon the payment process"
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  } 
   return (
    <>
    <div className="fixed md:block hidden z-50 top-0 bg-[#CC071B] w-full h-auto">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className={`font-bold text-white ${PaytoneOne.className}`}>
            BukaToko
          </h2>
        </div>
        <div className="flex flex-row gap-4 font-medium text-white">
          <h5>
            <Link href="/" className="flex flex-row gap-2">
              <HomeIcon /> Home
            </Link>
          </h5>
          <h5>
            <Link href="/products">Products</Link>
          </h5>
          <h5>
            <Link href="/contact">Contacts</Link>
          </h5>
          <h5>
            <Sheet>
              <SheetTrigger className="flex flex-row gap-2">
                <ShoppingBag/> {Cart.length}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <ScrollArea className="h-[500px] w-[300px] rounded-md border p-4">
                    {Cart.map((items, index) => (
                    <React.Fragment key={index}>
                      <div className="flex flex-col gap-3">
                        <Image src={items.url} alt="img" width={64} height={64} />
                        <div className="flex flex-col gap-2">
                          <span>{items.title}</span>
                          <span>{items.price}</span>
                        </div>
                        <div>
                          <Button onClick={() => decreaseQuantity(items.title)} variant="ghost">-</Button>
                          <span>{items.quantity}</span>
                          <Button onClick={() => increaseQuantity(items.title)} variant="ghost">+</Button>
                        </div>
                        <Button variant={"ghost"} onClick={() => removeFromCart(items.title)}> <TrashIcon /> </Button>
                      </div>
                    </React.Fragment>
                  ))}
                  </ScrollArea>
                    <div>
                        <h2>Total:</h2> <span className="font-bold text-lg">{totalPrice.toFixed(2)}</span>
                      </div>
                  <div className="mt-4">
                    <Button variant={"secondary"} onClick={handleCheckout} className="flex flex-row gap-2 w-full"> <ShoppingBag /> Checkout</Button>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </h5>
          <div>
            {isRole ? (
              <button
                onClick={() => router.push("/auth/login")}
                className="bg-white rounded-md p-2 w-16 h-8 flex justify-center items-center text-black font-medium italic"
              >
                Login
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <UserCircle />{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Carts</DropdownMenuItem>
                  <DropdownMenuItem onClick={LogoutButton}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="block md:hidden">
    <Sheet>
        <SheetTrigger className="ml-[289px] mt-8">
          <MenuSquare />
        </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-start">
          <SheetTitle className="text-[#CC071B] font-bold">BukaToko</SheetTitle>
           <div className="flex flex-col gap-2">
           <p>
            <Link href="/" className="flex flex-row gap-2">
              <HomeIcon /> Home
            </Link>
          </p>
          <p>
            <Link href="/products">Products</Link>
          </p>
          <p>
            <Link href="/contact">Contacts</Link>
          </p>
           <Button variant={"ghost"} onClick={LogoutButton}>Logout</Button>
           </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    <div className="md:hidden block mt-[-30px] ml-4">
    <Drawer>
  <DrawerTrigger className="flex flex-row"> <ShoppingBag/> <span className="-ml-4 -mt-2 font-bold bg-[#c13030] text-white w-5 h-5 p-1 flex justify-center items-center rounded-full">{Cart.length}</span> </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Your Cart</DrawerTitle>
      <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4">
                    {Cart.map((items, index) => (
                    <React.Fragment key={index}>
                      <div className="flex flex-col gap-3">
                        <Image src={items.url} className="ml-24" alt="img" width={124} height={124} />
                        <div className="flex flex-col gap-2">
                          <span>{items.title}</span>
                          <span>{items.price}</span>
                        </div>
                        <div>
                          <Button onClick={() => decreaseQuantity(items.title)} variant="ghost">-</Button>
                          <span>{items.quantity}</span>
                          <Button onClick={() => increaseQuantity(items.title)} variant="ghost">+</Button>
                        </div>
                        <Button variant={"ghost"} onClick={() => removeFromCart(items.title)}> <TrashIcon /> </Button>
                      </div>
                    </React.Fragment>
                  ))}
                  </ScrollArea>
    </DrawerHeader>
    <DrawerFooter>
      <h2>Total: <span className="font-bold">${totalPrice.toFixed(2)}</span> </h2>
      <Button onClick={handleCheckout} variant={"outline"}>Checkout</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
    </div>
    </div>
    </>
  )};

export default Navbar;