"use client";
import { faBars, faHeart, faMagnifyingGlass, faCartShopping, faUser, faHome, faAngleRight, faAngleDown, faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { BsFlower3 } from "react-icons/bs";
import { PiFlowerTulipLight } from "react-icons/pi";
import { GiFlowers, GiGraveFlowers } from "react-icons/gi";
import Image from "next/image";
import { apispreadsheets, imgFromDriveUrl } from "../shared/ApiSpreadSheet/ApiSpreadSheets";
import axios from "axios";

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
    const [subItems, setSubItems] = useState<string[]>([]); // Dữ liệu submenu
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null); // Theo dõi mục đang hover
    const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<number | null>(null);
    const [filterFlower, setFilterFlower] = useState<any>([]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

    const toggleMenu = (menuKey: any) => {
        setOpenMenus((prev: any) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };

    const handleHover = (categoryId: number) => {
        setHoveredCategory(categoryId);
        const filteredData = allData.filter(
            (item: any) => parseInt(item.categoriesid) === categoryId && item.bestseller === "x"
        );
        setSubItems(filteredData);
    };

    useEffect(() => {
        axios.get(`${apispreadsheets}/${sheetName}`)
            .then(res => {
                const result = res.data;
                setCategory(result);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const handleBarMenu = () => {
        setBarMenu((prev) => !prev);
        if (!barMenu) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setBarMenu(false);
            document.removeEventListener("click", handleClickOutside);
        }
    };

    return (
        <>
            {/* <div className="w-[100%] h-[100px] sm:h-[60px] flex text-[#] relative z-20 lg:block sm:hidden">
                <div className="flex items-center justify-between content-center justify-items-center w-[100%]">
                    <div className="flex relative">
                        <a href="" className="m-[10px] text-[18px] uppercase font-bold transition-colors duration-300">Trang chủ</a>
                        <div className="relative m-[10px]">
                            <div id="hkt" className="group relative text-[18px] uppercase font-bold transition-colors duration-300">
                                Hoa Khai Trương
                                <div className="absolute left-0 top-[200px] w-[200px] h-[100px] hidden bg-[#000] shadow-md transition-all duration-300 group-hover:block">
                                    <a href="" className="block p-[10px] text-[16px] text-black hover:bg-gray-200">Submenu 1</a>
                                    <a href="" className="block p-[10px] text-[16px] text-black hover:bg-gray-200">Submenu 2</a>
                                    <a href="" className="block p-[10px] text-[16px] text-black hover:bg-gray-200">Submenu 3</a>
                                </div>
                            </div>

                        </div>
                    
                    </div>

                    <div className="m-[10px] w-[35px] h-[35px] border-[1px] border-solid border-[#000] rounded-[20px] p-[6px_4px]">
                        <FontAwesomeIcon icon={faCartShopping} className="mr-[5px] text-[20px]" />
                    </div>
                </div>
            </div>
            <div className="bg-[#fff] opacity-50 z-[1]  w-[100%] h-[60px] absolute top-0 sm:h-[40px] sm:flex sm:justify-between sm:items-center sm:px-3 sm:z-[-1]">
                <div></div>
                <div>
                    <Image
                        src="/assets/images/apps/home/vi.jpg"
                        width={40}
                        height={20}
                        alt="vi"
                        loading="lazy"
                        className="sm:rounded-md xxl:hidden"
                    />
                </div>
            </div>

            <div className="sm:block xxl:hidden w-[100%] text-center fixed bottom-[20px] overflow-y-auto`" onClick={(e) => { e.stopPropagation(); }}>
                {barMenu && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-[30]"
                        onClick={() => setBarMenu(true)}
                    ></div>
                )}
                <div ref={menuRef} className={`${barMenu ? "bottom-[40px] opacity-100" : "bottom-[-20px] opacity-0"} 
                inline-block transition-all duration-1000 ease-in-out pb-8 h-[450px] w-[90%] 
                bg-[#fff] shadow-lg rounded-t-[20px] rounded-b-[10px] z-30 fixed left-[5%] overflow-y-auto`}>
                    {barMenu && (
                        <div className="border-b-[1px] border-solid border-[#ccc]">
                            <div className="">
                                <div className="mt-3 pb-3 text-[1.2rem] font-bold border-b-[1px] border-solid border-[#ccc]">Menu</div>
                                {menuItems.map((menu) => (
                                    <div key={menu.key} className="border-b-[1px] border-solid border-[#ccc] menu-item">
                                        <div
                                            className={`flex items-center justify-between px-5 text-[18px] font-semibold transition-all duration-500 cursor-pointer py-4 ${!menu.hasSubmenu && "cursor-default"
                                                }`}
                                            onClick={() => menu.hasSubmenu && toggleMenu(menu.key)}
                                        >
                                            <div className="flex items-center">
                                                {typeof menu.icon === "string" ? (
                                                    <img
                                                        src={menu.icon}
                                                        alt={menu.label}
                                                        className="w-[18px] h-[18px] mr-2"
                                                    />
                                                ) : (
                                                    menu.icon
                                                )}
                                                <span>{menu.label}</span>
                                            </div>
                                            {menu.hasSubmenu != false && (
                                                <FontAwesomeIcon
                                                    icon={openMenus[menu.key] ? faAngleDown : faAngleRight}
                                                />
                                            )}
                                        </div>
                                        {menu.submenus && (
                                            <div
                                                className={`overflow-hidden transition-[max-height] duration-300 ${openMenus[menu.key] ? "max-h-[300px]" : "max-h-0"
                                                    }`}
                                            >
                                                {menu.submenus.map((submenu, idx) => (
                                                    <a
                                                        key={idx}
                                                        href="#"
                                                        className="block p-[10px] text-[16px] text-black hover:bg-gray-200"
                                                    >
                                                        {submenu}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="inline-block w-[90%] h-[50px] shadow-md rounded-[25px] bg-[#fff] z-[40] relative" >
                    <div className="w-[100%] h-[100%] flex justify-around relative">
                        <FontAwesomeIcon icon={faBars} className="text-[20px] top-[17px] relative" onClick={handleBarMenu} />
                        <FontAwesomeIcon icon={faHeart} className="text-[20px] top-[17px] relative" />
                        <div className="bg-[#ffd3ca] w-[60px] h-[60px] relative bottom-[15px] rounded-[50%] ">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[30px] text-[#fff] absolute top-[15px] left-[16px]" />
                        </div>
                        <FontAwesomeIcon icon={faCartShopping} className="text-[20px] top-[17px] relative" />
                        <div className="w-[40px] h-[40px] bg-[#eee] rounded-[20px] relative top-[6px]">
                            <FontAwesomeIcon icon={faUser} className="text-[20px] absolute top-[8px] left-[11px]" />
                        </div>
                    </div>
                </div>
            </div> */}
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
                            <li className="group group-hover:visible">
                                <a href="" className="hover:text-blue-500">Trang chủ</a>
                            </li>
                            {category.map((item: any, index: number) => (
                                <li key={index} className="group group-hover:visible"
                                    onMouseEnter={() => handleHover(index + 1)}
                                    onMouseLeave={() => {
                                        setHoveredCategory(null);
                                        setSubItems([]);
                                    }}
                                >
                                    <a href="#" className="hover:text-blue-500">{item.content}</a>
                                    <FontAwesomeIcon
                                        icon={faCaretDown}
                                        className="ml-1 text-[14px]"
                                    />

                                    {hoveredCategory === index + 1 && subItems.length > 0 && (
                                        <div
                                            className="absolute top-[35px] left-0 w-full z-50 transition-all duration-300 ease-in-out visible"
                                        >
                                            <div className="w-full h-auto bg-white shadow-lg transition-all duration-300 ease-in-out opacity-100 translate-y-0">
                                                <div>

                                                    <div>
                                                        <div className="flex gap-5 px-32 py-5">
                                                            <div className="w-[250px]">
                                                                <div className="font-semibold">
                                                                    Theo mức giá
                                                                </div>
                                                                {filterFlower
                                                                    .filter((item: any) => item.prices)
                                                                    .map((price: any, priceIndex: number) => (
                                                                        <div key={priceIndex} className="py-2 px-1 hover:bg-black rounded-lg cursor-pointer">{price.prices}đ</div>
                                                                    ))}
                                                            </div>
                                                            <div className="w-[250px] mr-[50px]">
                                                                <div className="font-semibold">
                                                                    Theo màu sắc
                                                                </div>
                                                                {filterFlower.map((price: any, priceIndex: number) => (
                                                                    <div key={priceIndex} className="py-2 px-1 hover:bg-black rounded-lg cursor-pointer">{price.colors}</div>
                                                                ))}
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="mb-5 font-semibold">
                                                                    Best seller
                                                                </div>

                                                                <div className="grid grid-cols-3 gap-10">
                                                                    {subItems.map((subItem: any, subIndex: number) => (
                                                                        <div key={subIndex} className="w-full h-[350px] border-[1px] border-solid border-gray-400 rounded-lg">
                                                                            <Image src={imgFromDriveUrl(subItem.images)} width={300} height={350} loading="lazy" alt="Hoa" className="w-full h-[350px] rounded-md cursor-pointer" />
                                                                            {/* <div><span className="text-[.9rem]">Mã sản phẩm:</span> {subItem.code}</div>
                                                                            <div className="">
                                                                                <del>{subItem.original}</del>
                                                                            </div> */}
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* ))} */}
                                                </div>
                                            </div>
                                        </div>
                                    )}
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