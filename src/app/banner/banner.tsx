"use client";
import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apispreadsheets, imgFromDriveUrl } from "../shared/ApiSpreadSheet/ApiSpreadSheets";
import axios from "axios";
import Image from "next/image";
import CustomPaging from "../shared/CustomPaging/CustomPaging";

const Banner = () => {
    const [banner, setBanner] = useState([]);

    const sheetName = "banner";

    useEffect(() => {
        axios.get(`${apispreadsheets}/${sheetName}`)
            .then(res => {
                setBanner(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        customPaging: () => <CustomPaging className="mt-10 pl-[2.5%] md:ol-[4%]" onClick={() => "click"}/>,
    };
    return (
            <div className="carousel-container h-full mt-[2px]">
            <Slider {...settings}>
                {banner.map((item: any, index: number) => (
                    <div key={index}>
                        <Image
                            src={imgFromDriveUrl(item.img)}
                            width={1000}
                            height={500}
                            alt="Banner" 
                            loading="lazy"
                            className="w-full lg:h-[500px] sm:h-[200px]"
                            />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Banner;