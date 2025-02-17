"use client";
import React, { useEffect, useState } from "react";
import { apispreadsheets } from "../shared/ApiSpreadSheet/ApiSpreadSheets";
import axios from "axios";
const Contact = () => {
    const sheetName = "contact";
    const [ggMap, setGgMap] = useState<any>([]);
    useEffect(() => {
        axios.get(`${apispreadsheets}/${sheetName}`)
            .then(res => {
                console.log(res.data);
                setGgMap(res.data);
            }).catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div className="">
            <div>
                <div className="text-center text-[1.8rem] font-medium text-[#1e2934] sm:mt-14 font-mono">Liên hệ</div>
                <div className="text-center text-[.9rem]">Để lại thông tin của bạn để chúng tôi có thể phục vụ bạn tốt hơn</div>
            </div>
            <div className="flex justify-between m-10">
                <div className="pr-32">
                    <div className="text-[1.4rem] uppercase mb-1 font-mono font-semibold text-blue-600">Tiệm Hoa Cát Tường</div>
                    <div className="text-[.9rem] mb-1">178 Nguyễn Tri Phương, phường An Khánh, quận Ninh Kiều, TPCT</div>
                    <div className="flex items-center justify-between">
                        <div className="text-[.9rem]">Điện thoại: +84707181293</div>
                        <div className="text-[.9rem] pr-10">Email: <span className="text-blue-600 cursor-pointer">phangialac2406@gmail.com</span></div>
                    </div>
                    <div className="mt-10 mb-6">Nếu bạn có thắc mắc, vui lòng để lại thông tin bên dưới. Nhân viên của chúng tôi sẽ hỗ trợ cho bạn trong thời gian sớm nhất.</div>
                    <div>
                        <div className="flex flex-col">
                            <label>Tên<sup className="text-[1.2rem] text-red-500">*</sup></label>
                            <input type="text" placeholder="Nhập tên..." className="border-[1px] border-solid border-gray-400 mt-1 py-1 px-3 rounded-md focus:outline-none" />
                        </div>
                    </div>
                </div>
                <div>
                    {ggMap.map((item: any, index: number) => (
                        <div key={index}>
                            <div dangerouslySetInnerHTML={{ __html: item.map }} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Contact;