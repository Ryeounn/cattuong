'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FacebookButton = () => {
  return (
    <div className="fixed bottom-24 right-5 flex flex-col gap-3 z-50">
      {/* Nút Facebook */}
      <Link
        href="https://www.facebook.com/profile.php?id=100082167396228"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-blue-600 rounded-full flex relative z-20 items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
      >
        <Image
          src="/assets/images/apps/home/iconfacebook.webp" // Thay icon Facebook của bạn
          alt="Facebook"
          width={40}
          height={40}
          className="relative z-10"
        />
      </Link>
      <span className="absolute w-full h-full bg-blue-500 opacity-50 rounded-full animate-ping"></span>
    </div>
  );
};

export default FacebookButton;
