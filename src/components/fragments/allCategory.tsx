import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AllCategory = () => {
  return (
    <>
        <div className="lg:p-6 md:p-6 p-2  lg:ml-2 md:ml-2 ml-2">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 text-xs md:text-sm lg:text-xl gap-3">
          <Link href="/sneakers" className="bg-[#F3F0F0] flex flex-col rounded-xl justify-center items-center p-2">
            <Image
              src="/icons/mdi_shoe-sneaker.png"
              alt="imog"
              className="w-8 h-8 md:w-12 md:h-12"
              width={64}
              height={64}
            />
            <span className="font-medium text-xs md:text-sm">Sneakers</span>
          </Link>
          <Link href="/vegetables" className="bg-[rgb(243,240,240)] flex flex-col rounded-xl justify-center items-center p-2">
            <Image
              src="/icons/icon-park-solid_vegetable-basket.png"
              alt="imog"
              className="w-8 h-8 md:w-12 md:h-12"
              width={64}
              height={64}
            />
            <span className="font-medium text-xs md:text-sm">Vegetables</span>
          </Link>
          <Link href="/chairs" className="bg-[rgb(243,240,240)] flex flex-col rounded-xl justify-center items-center p-2">
            <Image
              src="/icons/ph_chair-fill.png"
              alt="imog"
              className="w-8 h-8 md:w-12 md:h-12"
              width={64}
              height={64}
            />
            <span className="font-medium text-xs md:text-sm">Accessories</span>
          </Link>
          <Link href="/fashion" className="bg-[rgb(243,240,240)] flex flex-col rounded-xl justify-center items-center p-2">
            <Image
              src="/icons/Group.png"
              alt="imog"
              className="w-8 h-8 md:w-12 md:h-12"
              width={64}
              height={64}
            />
            <span className="font-medium text-xs md:text-sm">Fashion</span>
          </Link>
          <Link href="/electronics" className="bg-[rgb(243,240,240)] flex flex-col rounded-xl justify-center items-center p-2">
            <Image
              src="/icons/laptop.png"
              alt="imog"
              className="w-8 h-8 md:w-12 md:h-12"
              width={64}
              height={64}
            />
            <span className="font-medium text-xs md:text-sm">Electronic</span>
          </Link>
        </div>
        </div>
    </>
  )
}

export default AllCategory