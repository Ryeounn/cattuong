"use client";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apispreadsheets } from "../shared/ApiSpreadSheet/ApiSpreadSheets";

const ContactFor = () => {
    const sheetName = "map";
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
        <div className="mb-10">
            <p className="text-center text-[1.8rem] font-medium text-[#1e2934] sm:mt-14 mb-10 font-mono">Liên hệ với chúng tôi</p>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2 mx-1">
                <div className="w-full lg:pl-20">
                    <div className="text-[24px] font-serif">Tiệm Hoa Cát Tường</div>
                    {ggMap.map((item: any, index: number) => (
                        <div className="!sm:pl-2" key={index}>
                            <div dangerouslySetInnerHTML={{ __html: item.map }} />
                        </div>
                    ))}
                </div>
                <div className="">
                    
                </div>
            </div>
        </div>
    )
}

export default ContactFor;