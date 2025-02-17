"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apispreadsheets } from "../shared/ApiSpreadSheet/ApiSpreadSheets";

const Footer = () => {
    const sheetName = "categories";
    const [category, setCategory] = useState<any>([]);


    useEffect(() => {
        axios.get(`${apispreadsheets}/${sheetName}`)
            .then(res => {
                const result = res.data;
                setCategory(result);
            }).catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <div>
            <footer className="bg-gray-800 text-white py-6 px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Cột 1: Thông tin cửa hàng */}
                    <div className="space-y-4">
                        <div className="text-[1.3rem] font-semibold">Tiệm Hoa Cát Tường</div>
                        <div className="text-[.8rem] !mt-1">Phục vụ tận tâm, chất lượng hàng đầu.</div>
                    </div>

                    {/* Cột 2: Cửa hàng & Hỗ trợ */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="text-[1.3rem] font-semibold">Cửa hàng</div>
                            {category.map((item: any, index: number) => (
                                <div key={index}>{item.content}</div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <div className="text-[1.3rem] font-semibold">Hỗ trợ</div>
                            <div><a href="/">Giới thiệu</a></div>
                            <div><a href="/contact">Liên hệ</a></div>
                            <div>Chính sách bảo mật</div>
                            <div>Sơ đồ trang web</div>
                        </div>
                    </div>

                    {/* Cột 3: Theo dõi chúng tôi */}
                    <div className="flex-1">
                        <div className="text-[1.3rem] font-semibold">
                            Theo dõi chúng tôi
                        </div>
                        <ul className="wrapper">
                            <li className="icon facebook">
                                <span className="tooltip">Facebook</span>
                                <svg
                                    viewBox="0 0 320 512"
                                    height="1.2em"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                    ></path>
                                </svg>
                            </li>
                            <li className="icon youtube">
                                <span className="tooltip">YouTube</span>
                                <svg
                                    height="1.8em"
                                    fill="currentColor"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="youtube"
                                >
                                    <path
                                        d="M43.6,14.2c-0.5-1.9-2-3.4-3.9-3.9C36.9,10,24,10,24,10s-12.9,0-15.7,0.4c-1.9,0.5-3.4,2-3.9,3.9C4,17,4,24,4,24s0,7,0.4,9.8
      c0.5,1.9,2,3.4,3.9,3.9C11.1,38,24,38,24,38s12.9,0,15.7-0.4c1.9-0.5,3.4-2,3.9-3.9c0.4-2.8,0.4-9.8,0.4-9.8S44,17,43.6,14.2z
      M20,30V18l10,6L20,30z"
                                    />
                                </svg>
                            </li>
                            <li className="icon instagram">
                                <span className="tooltip">Instagram</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1.2em"
                                    fill="currentColor"
                                    className="bi bi-instagram"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                    ></path>
                                </svg>
                            </li>
                        </ul>

                    </div>
                </div>

                {/* Đường kẻ phân cách */}
                <div className="mt-5 border-t border-[#ccc]"></div>
            </footer>

        </div>
    )
}

export default Footer;