'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ZaloButton = () => {

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center !z-[1000000]">
      <Link
        href="https://zalo.me/0939206602"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-16 bg-pink-500 rounded-full shadow-lg flex items-center justify-center text-white text-lg transition-transform hover:scale-110"
      >
        <span className="text-2xl">
            <Image
            src='/assets/images/apps/home/iconzalo.webp'
            width={150}
            height={150}
            alt="Icon Zalo"
            className="w-[30px] h-[30px]" />
        </span>

        {/* Hiệu ứng sóng */}
        <span className="absolute w-full h-full bg-pink-500 opacity-50 rounded-full animate-ping"></span>
      </Link>
    </div>
  );
};

export default ZaloButton;
