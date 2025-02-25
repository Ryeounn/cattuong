"use client";
import { faBars, faMagnifyingGlass, faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { apispreadsheets, imgFromDriveUrl } from "../shared/ApiSpreadSheet/ApiSpreadSheets";
import axios from "axios";
import Link from 'next/link';
import "react-loading-skeleton/dist/skeleton.css";

const Header = () => {
    const sheetName = "categories";
    const sheetBoutique = "boutique";
    const sheetFilter = "filter";
    const [barMenu, setBarMenu] = useState<boolean>(false);
    const [category, setCategory] = useState<any>([]);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [openMenus, setOpenMenus] = useState<any>({});
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [allData, setAllData] = useState<any[]>([]);
    const [subItems, setSubItems] = useState<string[]>([]);
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
    const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<number | null>(null);
    const [filterFlower, setFilterFlower] = useState<any>([]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const toggleSearch = () => {
        setIsSearchActive((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`${apispreadsheets}/${sheetBoutique}`)
                .then(res => {
                    setAllData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        };
        fetchData();
    }, []);

    useEffect(() => {
        axios.get(`${apispreadsheets}/${sheetFilter}`)
            .then(res => {
                setFilterFlower(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const handleHover = (categoryId: number) => {
        setHoveredCategory(categoryId);
        const filteredData = allData.filter(
            (item: any) => parseInt(item.categoriesid) === categoryId && item.bestseller === "x"
        );
        setSubItems(filteredData);
    };

    useEffect(() => {
        try {
            setLoading(true);
            axios.get(`${apispreadsheets}/${sheetName}`)
                .then(res => {
                    const result = res.data;
                    setCategory(result);
                }).catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log("Lỗi tải dữ liệu:", err);
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setBarMenu(false);
            document.removeEventListener("click", handleClickOutside);
        }
    };

    return (
        <>
            <div className="w-full lg:h-[40px] sm:h-[40px] flex items-center justify-between px-5 bg-[#1e2934] transition-all duration-500 ease-in-out">
                <div className="lg:block sm:hidden"></div>
                <div className="lg:text-lg lg:block sm:hidden sm:text-sm leading-[40px] lg:text-center sm:text-left font-times text-white">
                    Giao hàng miễn phí khu vực Ninh Kiều!{" "}
                    <span className="font-semibold underline">Đặt hàng ngay.</span>
                </div>
                <div className="lg:hidden sm:block font-mono text-white">
                    Tiệm hoa Cát Tường
                </div>
                <div className="pt-1 cursor-pointer" onClick={toggleSearch}>
                    <FontAwesomeIcon
                        icon={isSearchActive ? faXmark : faMagnifyingGlass}
                        className="text-[20px] text-white lg:block sm:hidden"
                    />
                    <FontAwesomeIcon
                        icon={faBars}
                        className="text-[20px] text-white lg:hidden sm:block"
                        onClick={() => setIsMenuOpen(true)}
                    />
                </div>
            </div>
            <div
                className={`fixed !z-[10001] top-0 right-0 h-full w-[50%] bg-gray-500 shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out lg:hidden`}
            >
                {/* Nút đóng menu */}
                <div className="p-4 flex justify-end z-[50]">
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="text-[24px] text-white cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                    />
                </div>

                {/* Nội dung menu */}
                <ul className="flex flex-col items-end gap-6 text-white mt-3 pr-5">
                    <li className="hover:text-blue-500 cursor-pointer">Trang chủ</li>
                    {category.map((item: any, index: number) => (
                        <li key={index} className="hover:text-blue-500 cursor-pointer">{item.content}</li>
                    ))}
                </ul>
            </div>

            <div className="w-full sm:hidden lg:inline-flex lg:h-[50px] lg:shadow-md flex justify-center items-center relative transition-all duration-500 ease-in-out">
                {!isSearchActive ? (
                    <div>
                        <ul className="flex gap-8">
                        {loading
                                ? [...Array(1)].map((_, index) => (
                                    <div key={index} className="w-[100px] h-[25px] rounded-lg bg-gray-300 animate-pulse"></div>
                                )): (
                                    <li className="group group-hover:visible">
                                    <Link href={`/`} className="hover:text-blue-500">Trang chủ</Link>
                                </li> 
                                )}
                            {loading
                                ? [...Array(6)].map((_, index) => (
                                    <div key={index} className="w-[100px] h-[25px] rounded-lg bg-gray-300 animate-pulse"></div>
                                ))
                                :
                                category.map((item: any, index: number) => (
                                    <li key={index} className="group group-hover:visible"
                                    >
                                        <Link href={`/products/${item.content.replace(/ /g, "-")}`} className="hover:text-blue-500">{item.content}</Link>
                                        <FontAwesomeIcon
                                            icon={faCaretDown}
                                            className="ml-1 text-[14px]"
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                ) : (
                    <div className="w-full flex items-center px-4 transition-all duration-500 ease-in-out">
                        <input
                            type="text"
                            placeholder="Nhập từ khóa để tìm kiếm..."
                            className="w-full border-b border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                        />
                    </div>
                )}
            </div>

        </>
    );
}
export default Header;