'use client';
import { useState } from "react";
import Image from "next/image";

const ZaloButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center">
      {/* Mã QR hiển thị khi mở */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)} // Bấm vào overlay để đóng
        >
          {/* Mã QR hiển thị ở giữa */}
          <div className="bg-white p-5 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 text-2xl hover:text-red-500"
            >
              ✖
            </button>
            <Image
              src="/assets/images/apps/home/iconzalo.webp"
              alt="QR Code Zalo"
              width={200}
              height={200}
            />
          </div>
        </div>
      )}

      {/* Nút Liên Hệ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-pink-500 rounded-full shadow-lg flex items-center justify-center text-white text-lg transition-transform hover:scale-110"
      >
        {/* Icon tin nhắn */}
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
      </button>
    </div>
  );
};

export default ZaloButton;
