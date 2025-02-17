"use client";

import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiFlowerFill } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import { apispreadsheets, imgFromDriveUrl } from "../shared/ApiSpreadSheet/ApiSpreadSheets";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "@/app/products/product.css";

const Nav = () => {
    const sheetName = "categories";
    const sheetProduct = "boutique";
    const ITEMS_PER_PAGE = 10;
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [categories, setCategories] = useState<any>([]);
    const [listProduct, setListProduct] = useState<any>([]);
    const [visibleCount, setVisibleCount] = useState<any>(ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const storedCategories = localStorage.getItem("categories");
    
                if (storedCategories) {
                    setCategories(JSON.parse(storedCategories)); // Dùng dữ liệu đã lưu
                } else {
                    const res = await axios.get(`${apispreadsheets}/${sheetName}`);
                    setCategories(res.data);
                    localStorage.setItem("categories", JSON.stringify(res.data)); // Lưu vào localStorage
                }
            } catch (err) {
                console.log("Lỗi tải dữ liệu:", err);
            }
        };
    
        fetchCategories();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prev: any) => prev + ITEMS_PER_PAGE);
    };

    const handleViewAll = () => {
        setVisibleCount(listProduct.length);
    };

    useEffect(() => {
        const getData = () => {
            axios.get(`${apispreadsheets}/${sheetProduct}`)
                .then(res => {
                    const filteredData = res.data.filter(
                        (item: any) => parseInt(item.categoriesid) == selectedCategory
                    );
                    setListProduct(filteredData);
                })
        }
        getData();
    }, [selectedCategory]);


    return (
        <div>
            <div className="text-center text-[1.8rem] font-medium text-[#1e2934] sm:mt-14 lg:mb-10 sm:mb-4 font-mono">Danh Mục Sản Phẩm 2025</div>
            <div className="flex justify-center gap-8 sm:hidden lg:flex">
                {categories.map((item: any, index: number) => (
                    <div key={index} className={`w-[150px] h-[150px] bg-black rounded-[50%] cursor-pointer`} onClick={() => setSelectedCategory(item.categoriesid)}>
                        <Image
                            src={imgFromDriveUrl(item.images)}
                            width={150}
                            height={150}
                            loading="lazy"
                            alt={item.content}
                            className={`w-[150px] h-[150px] bg-black rounded-[50%] transition-all duration-300 ${selectedCategory == item.categoriesid ? "scale-125 shadow-xl" : ""
                                }`} />
                        <p className={`text-[.9rem] text-[rgb(230,0,18)] font-semibold mt-5 uppercase text-center transition-all duration-300 ${selectedCategory == item.categoriesid ? '!mt-10' : '!mt-5'}`}>{item.content}</p>
                    </div>
                ))}
            </div>
            <div className="sm:grid grid-cols-2 gap-3 mx-5 lg:hidden">
                {categories.map((item: any, index: number) => {
                    const isLastOdd = categories.length % 2 !== 0 && index === categories.length - 1;
                    const isSelected = selectedCategory === item.categoriesid;

                    return (
                        <div
                            key={index}
                            onClick={() => setSelectedCategory(item.categoriesid)}
                            className={`relative w-full h-[80px] cursor-pointer border-[1px] border-solid border-gray-300 rounded-lg bg-cover bg-center flex items-center justify-center 
        ${isLastOdd ? "col-span-2 mx-auto w-1/2" : ""}`}
                            style={{ backgroundImage: `url(${imgFromDriveUrl(item.images)})` }}
                        >
                            {/* Overlay */}
                            <div
                                className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out rounded-lg lg:hidden sm:block
          ${isSelected ? "opacity-100" : "opacity-0"}`}
                            ></div>

                            <p className="relative text-[.9rem] text-black font-semibold uppercase text-center bg-white/70 px-2 py-1 rounded-md">
                                {item.content}
                            </p>
                        </div>
                    );
                })}
            </div>

            {listProduct && (
                <div className="lg:mt-20 lg:mx-20 sm:mt-10 sm:mx-5">
                    <div className="flex items-center justify-between">
                        <div className="font-mono hover:underline cursor-pointer" onClick={handleViewAll}>Xem tất cả</div>
                    </div>
                    <div className="mt-5">
                        <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-5">
                            {listProduct.slice(0, visibleCount).map((item: any) => (
                                <div key={item.boutiqueid} className="card">
                                    <div className="product-img">
                                        <Image
                                            width={200}
                                            height={200}
                                            alt="Hoa"
                                            loading="lazy"
                                            src={imgFromDriveUrl(item.images)}
                                            className="w-[250px] h-[250px]"
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center text-box">
                                        <del className="text-lg text-gray-400">{item.original}đ</del>
                                        <div className="ml-2 font-semibold text-[rgb(230,0,18)]">{item.discount}đ</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nút Xem thêm */}
                    {visibleCount < listProduct.length && (
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={handleLoadMore}
                                className="px-5 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all"
                            >
                                Xem thêm {listProduct.length - visibleCount} sản phẩm
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Nav;