import React from "react";
import Image from "next/image";
import FlashSale from "@/components/fragments/FlashSale";
import Link from "next/link";


const Category = [
  {
    id: 1,
    "title": "Sneakers",
    "image": "/icons/mdi_shoe-sneaker.png",
  },
  {
    id: 2,
    "title": "Vegetables",
    "image": "/icons/icon-park-solid_vegetable-basket.png",
  },
  {
    id: 3,
    "title": "Fashions",
    "image": "/icons/Group.png",
  },
  {
    id: 4,
    "title": "Accessories",
    "image": "/icons/ph_chair-fill.png",
  },
  {
    id: 5,
    "title": "Electronics",
    "image": "/icons/laptop.png",
  }
]


const Homepage = () => {
  return (
    <>
      <div className="mt-24 mx-16 flex justify-center items-center">
        <Image src="/sneakers-banner.png" alt="" width={1187} height={837} className="md:w-[1037px] w-[687px] h-auto rounded-4xl" />
      </div>
      <div className=" p-12 md:ml-[200px] grid md:grid-cols-5 grid-cols-3 md:gap-20">
        {Category.map((item) => (
          <Link href={`/${item.title}`} key={item.id} className="flex  flex-col justify-center items-center">
            <Image src={item.image} alt="" width={60} height={60} className="md:w-[60px] md:h-[60px] w-8 h-8"/>
            <h5 className="md:text-xl font-bold text-xs">{item.title}</h5>
          </Link>
        ))}
      </div>
      <FlashSale />
      <div className="md:ml-64 ml-6 mt-8 mb-8 md:mb-0 md:mt-0">
        <Image
          src="/offer-circle.jpg"
          className="w-[560px] h-auto md:w-[960px] md:h-auto"
          alt=""
          width={960}
          height={480}
        />
      </div>
    </>
  );
};
export default Homepage;
