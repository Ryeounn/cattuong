"use client";
import { useState } from "react";
import { faTruck, faCircleCheck, faEnvelope, faFaceKissWinkHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Banner from "./banner/banner";
import Benefit from "./benefit/benefit";
import Product from "./products/product";
import ContactFor from "./contact/contact";
import Nav from "./nav/nav";

export default function Home() {
  return (
    <>
      <div id="banner">
        <Banner />
      </div>
      <div id="nav">
        <Nav/>
      </div>
      <div id="benefit">
        <Benefit />
      </div>
    </>
  );
}
