"use client";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./product.css";

const Product = () => {
    
    return (
        <div className="mt-[100px]">
            <p className="text-center text-[1.8rem] font-medium text-[#1e2934] sm:mt-14 mb-10 font-mono"><FontAwesomeIcon icon={faBolt} /> Flash sale <FontAwesomeIcon icon={faBolt} /></p>
            <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-5 mx-10">
                <div className="card">
                    <div className="product-img">
                        <img src="/assets/images/apps/1.jpg" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-box">
                        <h2 className="text-xl font-bold">Hoa Tốt Nghiệp</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="product-img">
                        <img src="/assets/images/apps/1.jpg" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-box">
                        <h2 className="text-xl font-bold">Hoa Tốt Nghiệp</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="product-img">
                        <img src="/assets/images/apps/1.jpg" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-box">
                        <h2 className="text-xl font-bold">Hoa Tốt Nghiệp</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="product-img">
                        <img src="/assets/images/apps/1.jpg" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-box">
                        <h2 className="text-xl font-bold">Hoa Tốt Nghiệp</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;