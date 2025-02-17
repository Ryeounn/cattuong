"use client";
import { faCircleCheck, faEnvelope, faFaceKissWinkHeart, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Benefit = () => {
    return (
        <div className="mt-[100px]">
            <p className="text-center text-[1.8rem] font-medium text-[#1e2934] sm:mt-14 sm:mb-10 lg:mb-16 font-mono">Quyền lợi khách hàng</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2 mx-10">
                <div className="border-[1px] border-solid sm:border-gray-400 lg:border-transparent hover:border-[#ccc] rounded-[10px] text-center m-[10px_5px] h-[150px] hover:shadow-md p-[10px] pt-5 cursor-pointer transition-all duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faTruck} className="text-[20px] text-gray-600 mb-[10px] tracking-wide absolute z-20" />
                    <svg className="relative sm:top-[-20px] lg:top-[-15px] sm:left-[130px] lg:left-[138px] z-10" viewBox="0 0 200 200" width="65" height="65" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#F6C5CD" d="M41.1,-74C51.4,-65.2,56.6,-50.4,59,-37.1C61.5,-23.8,61.2,-11.9,58.8,-1.4C56.4,9.1,51.9,18.2,48.9,30.6C45.9,43,44.4,58.7,36.5,64.1C28.6,69.5,14.3,64.6,1.2,62.5C-11.8,60.3,-23.7,60.9,-34,56.9C-44.4,53,-53.2,44.4,-62.9,34.1C-72.5,23.9,-83,11.9,-82.1,0.5C-81.3,-10.9,-69,-21.8,-57.8,-29.5C-46.7,-37.1,-36.6,-41.5,-27.1,-50.8C-17.6,-60.1,-8.8,-74.3,3.3,-80C15.4,-85.7,30.8,-82.8,41.1,-74Z" transform="translate(100 100)" />
                    </svg>
                    <p className="font-bold">Giao Hàng Miễn Phí</p>
                    <p className="tracking-tighter">Giao hàng miễn phí khu vực Ninh Kiều</p>
                </div>
                <div className="border-[1px] border-solid sm:border-gray-400 lg:border-transparent hover:border-[#ccc] rounded-[10px] text-center m-[10px_5px] hover:shadow-md p-[10px] pt-5 cursor-pointer transition-all duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-[20px] text-gray-600 mb-[10px] tracking-wide absolute z-20" />
                    <svg className="relative sm:top-[-20px] lg:top-[-12px] sm:left-[130px] lg:left-[138px] z-10" viewBox="0 0 200 200" width="65" height="65" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#D3F6EE" d="M41.1,-74C51.4,-65.2,56.6,-50.4,59,-37.1C61.5,-23.8,61.2,-11.9,58.8,-1.4C56.4,9.1,51.9,18.2,48.9,30.6C45.9,43,44.4,58.7,36.5,64.1C28.6,69.5,14.3,64.6,1.2,62.5C-11.8,60.3,-23.7,60.9,-34,56.9C-44.4,53,-53.2,44.4,-62.9,34.1C-72.5,23.9,-83,11.9,-82.1,0.5C-81.3,-10.9,-69,-21.8,-57.8,-29.5C-46.7,-37.1,-36.6,-41.5,-27.1,-50.8C-17.6,-60.1,-8.8,-74.3,3.3,-80C15.4,-85.7,30.8,-82.8,41.1,-74Z" transform="translate(100 100)" />
                    </svg>
                    <p className="font-bold">Giao hàng đúng mẫu</p>
                    <p className="tracking-tighter">Đa dạng mẫu mã cho khách hàng lựa chọn</p>
                </div>
                <div className="border-[1px] border-solid sm:border-gray-400 lg:border-transparent hover:border-[#ccc] rounded-[10px] text-center m-[10px_5px] hover:shadow-md p-[10px] pt-5 cursor-pointer transition-all duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faEnvelope} className="text-[20px] text-gray-600 mb-[10px] tracking-wide absolute z-20" />
                    <svg className="relative sm:top-[-20px] lg:top-[-12px] sm:left-[130px] lg:left-[138px] z-10" viewBox="0 0 200 200" width="65" height="65" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#F6ECBB" d="M41.1,-74C51.4,-65.2,56.6,-50.4,59,-37.1C61.5,-23.8,61.2,-11.9,58.8,-1.4C56.4,9.1,51.9,18.2,48.9,30.6C45.9,43,44.4,58.7,36.5,64.1C28.6,69.5,14.3,64.6,1.2,62.5C-11.8,60.3,-23.7,60.9,-34,56.9C-44.4,53,-53.2,44.4,-62.9,34.1C-72.5,23.9,-83,11.9,-82.1,0.5C-81.3,-10.9,-69,-21.8,-57.8,-29.5C-46.7,-37.1,-36.6,-41.5,-27.1,-50.8C-17.6,-60.1,-8.8,-74.3,3.3,-80C15.4,-85.7,30.8,-82.8,41.1,-74Z" transform="translate(100 100)" />
                                </svg>
                    <p className="font-bold">Tặng thiệp cho khách hàng mua hoa</p>
                    <p className="tracking-tighter">Giao hàng miễn phí khu vực Ninh Kiều</p>
                </div>
                <div className="border-[1px] border-solid sm:border-gray-400 lg:border-transparent hover:border-[#ccc] rounded-[10px] text-center m-[10px_5px] hover:shadow-md p-[10px] pt-5 cursor-pointer transition-all duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faFaceKissWinkHeart} className="text-[20px] text-gray-600 mb-[10px] tracking-wide absolute z-20" />
                    <svg className="relative sm:top-[-20px] lg:top-[-12px] sm:left-[130px] lg:left-[138px] z-10" viewBox="0 0 200 200" width="65" height="65" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#DEECED" d="M41.1,-74C51.4,-65.2,56.6,-50.4,59,-37.1C61.5,-23.8,61.2,-11.9,58.8,-1.4C56.4,9.1,51.9,18.2,48.9,30.6C45.9,43,44.4,58.7,36.5,64.1C28.6,69.5,14.3,64.6,1.2,62.5C-11.8,60.3,-23.7,60.9,-34,56.9C-44.4,53,-53.2,44.4,-62.9,34.1C-72.5,23.9,-83,11.9,-82.1,0.5C-81.3,-10.9,-69,-21.8,-57.8,-29.5C-46.7,-37.1,-36.6,-41.5,-27.1,-50.8C-17.6,-60.1,-8.8,-74.3,3.3,-80C15.4,-85.7,30.8,-82.8,41.1,-74Z" transform="translate(100 100)" />
                                </svg>
                    <p className="font-bold">Cam kết hài lòng</p>
                    <p className="tracking-tighter">Phục vụ bằng cả trái tim</p>
                </div>
            </div>
        </div>
    )
};

export default Benefit;