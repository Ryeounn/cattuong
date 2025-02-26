'use client';
import { apispreadsheets, imgFromDriveUrl } from "@/app/shared/ApiSpreadSheet/ApiSpreadSheets";
import Link from 'next/link';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';
import "../product.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
    const sheetName = "categories";
    const sheetBoutique = "boutique";
    const sheetFilter = "filter";
    const ITEMS_PER_PAGE = 6;
    const params = useParams();
    const slug = params.slug as string;
    const decodeSlug = decodeURIComponent(slug);
    const productType = decodeSlug.replace(/-/g, " ");
    const [filterFlower, setFilterFlower] = useState<any>([]);
    const [category, setCategory] = useState<any>([]);
    const [allProduct, setAllProduct] = useState<any>([]);
    const [visibleCount, setVisibleCount] = useState<any>(ITEMS_PER_PAGE);
    const [loading, setLoading] = useState<boolean>(true);
    const [producLoading, setProductLoading] = useState<boolean>(true);
    const [selectedPrice, setSelectedPrice] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);


    useEffect(() => {
        try {
            setLoading(true);
            axios.get(`${apispreadsheets}/${sheetFilter}`)
                .then(res => {
                    setFilterFlower(res.data);
                }).catch(err => {
                    console.log(err);
                });

            axios.get(`${apispreadsheets}/${sheetBoutique}`)
                .then(res => {
                    setAllProduct(res.data);
                }).catch(err => {
                    console.log(err);
                });

        } catch (err) {
            console.log("Lỗi tải dữ liệu:", err);
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }, []);

    useEffect(() => {
        try {
            setLoading(true);
            axios.get(`${apispreadsheets}/${sheetName}`)
                .then(res => {
                    const result = res.data.filter((item: any) => item.content == productType);
                    setCategory(result);
                    getData(result[0].categoriesid);
                }).catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log("Lỗi tải dữ liệu:", err);
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }, [slug]);

    const handleFilterByPrice = (price: string) => {
        setSelectedPrice(price);
    };

    const handleFilterByColor = (color: string) => {
        setSelectedColor(color);
    };

    const filteredProducts = allProduct.filter((item: any) => {
        const price = parseInt(item.discount?.replace(/\./g, ""), 10);
        const selectedPriceNum = parseInt(selectedPrice.replace(/\./g, ""), 10);

        const matchPrice = selectedPrice ? price >= selectedPriceNum : true;
        const matchColor = selectedColor
            ? item.color.trim().toLowerCase() === selectedColor.trim().toLowerCase()
            : true;

        return matchPrice && matchColor;
    });

    const getData = async (categoriesId: any) => {
        try {
            setProductLoading(true);
            axios.get(`${apispreadsheets}/${sheetBoutique}`)
                .then(res => {
                    console.log(res.data);
                    const all = res.data.filter(((item: any) => item.categoriesid == categoriesId))
                    setAllProduct(all);
                    console.log(all);
                }).catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log("Lỗi tải dữ liệu:", err);
        } finally {
            setTimeout(() => setProductLoading(false), 1000);
        }
    }

    const handleLoadMore = () => {
        setVisibleCount((prev: any) => prev + ITEMS_PER_PAGE);
    };

    const handleViewAll = () => {
        setSelectedPrice("");
        setSelectedColor("");
        setVisibleCount(allProduct.length);
    };

    return (
        <div className="font-mono mt-5 sm:mx-5 md:mx-5 lg:mx-20">
            {loading
                ? [...Array(1)].map((_, index) => (
                    <div key={index} className="w-[calc(100%-40px)] h-[50px] my-2 rounded-lg bg-gray-300 animate-pulse"></div>
                )) : (
                    <div>
                        <Link className="text-gray-300 hover:text-black" href="/">Trang chủ</Link> / <p className="inline-block">{productType}</p>
                    </div>
                )}

            <div className="flex my-10">
                <div className="sm:w-0 sm:hidden md:block lg:block md:w-[25%] lg:w-[20%] h-full sticky top-5">
                    {loading
                        ? [...Array(10)].map((_, index) => (
                            <div key={index} className="w-full h-[50px] my-2 rounded-lg bg-gray-300 animate-pulse"></div>
                        ))
                        : category.map((item: any, index: number) => (
                            <div key={index}>
                                <div>
                                    <div>Lọc theo giá</div>
                                    <div className="w-[30px] h-[5px] bg-gray-300"></div>
                                    <div className="mt-2">
                                        {filterFlower
                                            .filter((item: any) => item.prices)
                                            .map((price: any, priceIndex: number) => (
                                                <div key={priceIndex} onClick={() => handleFilterByPrice(price.prices)} className={`${selectedPrice === price.prices ? 'text-blue-400' : 'text-black'} py-2 px-1 hover:text-blue-400 rounded-lg cursor-pointer border-b-[1px] last:border-none`}>Mẫu {price.prices}đ</div>
                                            ))}
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <div>Theo màu sắc</div>
                                    <div className="w-[30px] h-[5px] bg-gray-300"></div>
                                    <div className="mt-2">
                                        {filterFlower.map((price: any, priceIndex: number) => (
                                            <div key={priceIndex} onClick={() => handleFilterByColor(price.colors)} className={`${selectedColor === price.colors ? 'text-blue-400' : 'text-black'} py-2 px-1 hover:text-blue-400 rounded-lg cursor-pointer border-b-[1px] last:border-none`}>Màu {price.colors}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="sm:w-full md:w-[75%] lg:w-[80%] h-full sm:mx-0 md:mx-10 lg:mx-10">
                    {producLoading ? (
                        [...Array(2)].map((_, index) => (
                            <div key={index} className="w-[calc(100%-10px)] h-[350px] m-2 rounded-lg bg-gray-300 animate-pulse"></div>
                        ))
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-5">
                                <div className="sm:hidden md:flex lg:flex flex items-center gap-4">
                                    {selectedPrice && (
                                        <div className="relative py-1 px-3 border-[1px] rounded-md border-gray-500 hover:bg-gray-300 transition-all duration-300">
                                            <div>
                                                {selectedPrice}
                                            </div>
                                            <div className="absolute cursor-pointer text-[1.1rem] top-[-10px] right-[-10px]" onClick={() => setSelectedPrice("")}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </div>
                                        </div>
                                    )}
                                    {selectedColor && (
                                        <div className="relative py-1 px-3 border-[1px] rounded-md border-gray-500 hover:bg-gray-300 transition-all duration-300">
                                            <div >
                                                {selectedColor}
                                            </div>
                                            <div className="absolute cursor-pointer text-[1.1rem] top-[-10px] right-[-10px]" onClick={() => setSelectedColor("")}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="sm:block md:hidden lg:hidden bg-blue-400 hover:bg-blue-600 text-white py-1 px-3 rounded-md cursor-pointer"
                                    onClick={() => setIsFilterOpen(true)}
                                >
                                    <FontAwesomeIcon icon={faFilter} /> Filter
                                </div>
                                <div onClick={handleViewAll} className=" py-1 cursor-pointer hover:underline">Xem tất cả</div>
                            </div>
                            <div className={`${filteredProducts.length > 0 ? 'grid lg:grid-cols-3 sm:grid-cols-1 gap-8' : 'block'}`}>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.slice(0, visibleCount).map((item: any) => (
                                        <Link key={item.boutiqueid} href={`/products/${decodeSlug}/${item.code}`}>
                                            <div className="w-full h-[450px] border-[1px] rounded-lg p-3 cursor-pointer overflow-hidden">
                                                <div className="w-full h-[350px] overflow-hidden">
                                                    <Image
                                                        loading='lazy'
                                                        width={500}
                                                        height={500}
                                                        alt={item.code}
                                                        src={imgFromDriveUrl(item.images)}
                                                        className="w-full h-full !rounded-lg object-cover transition-transform duration-500 hover:scale-110 transform-origin-center"
                                                    />
                                                </div>
                                                <div className="mt-8 flex gap-2 items-center justify-center">
                                                    <div className="font-semibold text-[rgb(230,0,18)]">{item.discount}đ</div>
                                                    <del className="text-lg text-gray-400">{item.original}đ</del>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="grid-flow-col">Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</div>
                                )}

                            </div>

                            {filteredProducts && visibleCount < filteredProducts.length && (
                                <div className="flex justify-center mt-5">
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-5 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all"
                                    >
                                        Xem thêm {filteredProducts.length - visibleCount} sản phẩm
                                    </button>
                                </div>
                            )}
                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div
                                        initial={{ x: "-100%" }} // Bắt đầu ngoài màn hình bên trái
                                        animate={{ x: "0%" }}   // Trượt vào giữa
                                        exit={{ x: "-100%" }}    // Khi đóng sẽ trượt ra ngoài
                                        transition={{ duration: 0.5 }}
                                        className="fixed top-0 left-0 w-[50%] h-full bg-white z-50 flex flex-col p-5 shadow-lg overflow-y-scroll ov"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-bold">Bộ Lọc</h2>
                                            <div className="cursor-pointer text-2xl" onClick={() => setIsFilterOpen(false)}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </div>
                                        </div>

                                        {/* Lọc theo giá */}
                                        <div className="mt-5">
                                            <div>Lọc theo giá</div>
                                            <div className="w-[30px] h-[5px] bg-gray-300"></div>
                                            <div className="mt-2">
                                                {filterFlower
                                                    .filter((item: any) => item.prices)
                                                    .map((price: any, priceIndex: number) => (
                                                        <div key={priceIndex} onClick={() => handleFilterByPrice(price.prices)} className={`${selectedPrice === price.prices ? 'text-blue-400' : 'text-black'} py-2 px-1 hover:text-blue-400 rounded-lg cursor-pointer border-b-[1px] last:border-none`}>
                                                            Mẫu {price.prices}đ
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Lọc theo màu sắc */}
                                        <div className="mt-10">
                                            <div>Theo màu sắc</div>
                                            <div className="w-[30px] h-[5px] bg-gray-300"></div>
                                            <div className="mt-2">
                                                {filterFlower.map((color: any, colorIndex: number) => (
                                                    <div key={colorIndex} onClick={() => handleFilterByColor(color.colors)} className={`${selectedColor === color.colors ? 'text-blue-400' : 'text-black'} py-2 px-1 hover:text-blue-400 rounded-lg cursor-pointer border-b-[1px] last:border-none`}>
                                                        Màu {color.colors}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Nút đóng */}
                                        <div className="mt-10 flex justify-center">
                                            <button
                                                onClick={() => setIsFilterOpen(false)}
                                                className="px-5 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all"
                                            >
                                                Đóng
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    )}
                </div>

            </div>
        </div>
    )
}

export default Product;