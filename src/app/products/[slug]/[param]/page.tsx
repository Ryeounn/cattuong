'use client'

import { apispreadsheets, imgFromDriveUrl } from "@/app/shared/ApiSpreadSheet/ApiSpreadSheets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSquareCheck } from "react-icons/fa6";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Detail = () => {
    const params = useParams();
    const sheetName = 'boutique';
    const sheetCate = "categories";
    const beSlug = params.param as string;
    const slug = params.slug as string;
    const decodeSlug = decodeURIComponent(slug);
    const productType = decodeSlug.replace(/-/g, " ");
    const decodeParam = decodeURIComponent(beSlug)
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<any>([]);
    const [choose, setChoose] = useState<any>("write");
    const [write, setWrite] = useState<any>([]);
    const [guide, setGuide] = useState<any>([]);
    const [relationship, setRelationship] = useState<any>([]);
    const [category, setCategory] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const PrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-400 p-2 rounded-full text-white hover:bg-gray-600"
            >
                <FaChevronLeft size={12} />
            </button>
        );
    };

    // Nút Next
    const NextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-400 p-2 rounded-full text-white hover:bg-gray-600"
            >
                <FaChevronRight size={12} />
            </button>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        customPaging: () => (
            <div className="w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 hover:bg-red-500"></div>
        ),
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    useEffect(() => {
        try {
            setLoading(true);
            axios.post(`${apispreadsheets}/${sheetName}`)
                .then(res => {
                    const product = res.data.filter((item: any) => item.code === beSlug);
                    setProduct(product);
                    getWrite();
                    getCategory();
                }).catch(err => {
                    console.log(err);
                })
        } catch {
            console.log('Error');
        } finally {
            setLoading(false);
        }
    }, []);

    const getCategory = async () => {
        try {
            setLoading(true);
            axios.get(`${apispreadsheets}/${sheetCate}`)
                .then(res => {
                    const result = res.data.filter((item: any) => item.content === productType);
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
    };

    const getData = async (categoriesId: any) => {
        try {
            setLoading(true);
            axios.get(`${apispreadsheets}/${sheetName}`)
                .then(res => {
                    const all = res.data.filter(((item: any) => item.categoriesid === categoriesId && item.code !== beSlug));
                    setRelationship(all);
                }).catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log("Lỗi tải dữ liệu:", err);
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    }

    const getWrite = async () => {
        const sheetName = 'benefit';
        axios.post(`${apispreadsheets}/${sheetName}`)
            .then(res => {
                setWrite(res.data[0].write);
                setGuide(res.data[0].guide);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <div className="font-mono mt-5 mx-5 md:mx-10 lg:mx-20">
                {loading ? (
                    [...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="w-full md:w-[calc(50%-10px)] lg:w-[calc(50%-30px)] inline-flex h-[400px] md:h-[500px] my-2 mx-1 md:mx-2 rounded-lg bg-gray-300 animate-pulse"
                        ></div>
                    ))
                ) : (
                    <div>
                        {/* Đường dẫn */}
                        <div className="text-sm md:text-base">
                            <Link className="text-gray-300 hover:text-black" href="/">Trang chủ</Link> / <Link className="text-gray-300 hover:text-black" href={`/products/${decodeSlug}`}>{decodeSlug.replace(/-/g, " ")}</Link> / <p className="inline-block">{decodeParam}</p>
                        </div>

                        {/* Chi tiết sản phẩm */}
                        <div className="mt-8">
                            {product.map((item: any, index: number) => (
                                <div key={index}>
                                    <div className="flex flex-col md:flex-row">
                                        {/* Hình ảnh */}
                                        <div className="w-full md:w-[50%] lg:w-[35%] border-[1px] border-gray-400 rounded-lg p-4 overflow-hidden">
                                            <Image
                                                src={imgFromDriveUrl(item.images)}
                                                width={300}
                                                height={300}
                                                alt="Photo"
                                                className="w-full h-[300px] md:h-[500px] !rounded-md transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>

                                        {/* Thông tin sản phẩm */}
                                        <div className="w-full md:w-[50%] lg:w-[60%] mt-5 md:mt-0 md:ml-[5%]">
                                            <div className="text-[1.4rem] md:text-[1.6rem] text-left text-[rgb(230,0,18)]">
                                                Mã sản phẩm: {item.code}
                                            </div>
                                            <div className="flex items-center mt-3">
                                                <div className="text-[1.2rem] md:text-[1.4rem] font-semibold text-[rgb(230,0,18)]">
                                                    {item.discount}đ
                                                </div>
                                                <del className="text-[1.2rem] md:text-[1.4rem] text-gray-400 ml-3">{item.original}đ</del>
                                            </div>

                                            {/* Nút hành động */}
                                            <div className="flex flex-col md:flex-row gap-5 my-8">
                                                <div className="py-2 px-16 w-full md:w-fit border-[1px] font-semibold rounded-3xl text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-500 cursor-pointer text-center">
                                                    Gọi điện
                                                </div>
                                                <div className="py-2 px-16 w-full md:w-fit border-[1px] font-semibold rounded-3xl text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-500 cursor-pointer text-center">
                                                    Chat Zalo
                                                </div>
                                            </div>

                                            {/* Chính sách */}
                                            <div className="mt-5 space-y-3 py-3 px-4 w-full h-fit border-[1px] rounded-lg font-sans">
                                                {[
                                                    "Tặng Thiệp / Banner",
                                                    "Cam kết giao đúng giờ",
                                                    "Đặt là có giao ngay. Miễn phí giao hoa nội thành",
                                                    "Hình ảnh sẽ được gửi trước và sau khi giao xong",
                                                    "Cam kết 100% hoàn tiền nếu Bạn không hài lòng"
                                                ].map((text, i) => (
                                                    <div key={i} className="text-[1rem] md:text-[1.2rem] flex items-center gap-2">
                                                        <FaSquareCheck className="text-green-500" /> {text}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Cách viết nội dung & Hướng dẫn đặt hàng */}
                            <div className="border-[1px] shadow-md p-3 mt-10 mb-5 rounded-md">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                                    {[
                                        { key: "write", text: "Cách viết nội dung" },
                                        { key: "guide", text: "Hướng dẫn đặt hàng" }
                                    ].map((tab) => (
                                        <div
                                            key={tab.key}
                                            className={`uppercase py-2 px-5 border-[1px] rounded-lg border-gray-300 ${choose === tab.key ? 'cursor-default bg-blue-400 text-white' : 'cursor-pointer bg-white text-black'}`}
                                            onClick={() => setChoose(tab.key)}
                                        >
                                            {tab.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5" dangerouslySetInnerHTML={{ __html: choose === 'write' ? write : guide }} />
                            </div>

                            {/* Sản phẩm tương tự */}
                            <div className="border-[1px] shadow-md p-3 mt-10 mb-5 rounded-md">
                                <div className="text-xl my-5 text-center uppercase font-semibold text-blue-400">Sản phẩm tương tự</div>
                                <div className="relative mb-5">
                                    <Slider {...settings}>
                                        {relationship.map((item: any) => (
                                            <div key={item.code} className="px-2">
                                                <div className="w-full h-[400px] border-[1px] rounded-md p-3 shadow-lg">
                                                    <img
                                                        src={imgFromDriveUrl(item.images)}
                                                        alt="Photo"
                                                        className="w-full h-[300px] rounded-md transition-transform duration-500 hover:scale-105"
                                                    />
                                                    <div className="mt-2 text-[1.4rem] text-center text-red-600">{item.code}</div>
                                                    <div className="flex gap-2 justify-center items-center">
                                                        <div className="text-center text-red-600">{item.discount}đ</div>
                                                        <del className="text-center text-gray-400">{item.original}đ</del>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Detail;