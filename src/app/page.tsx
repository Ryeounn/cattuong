"use client";
import { useState } from "react";
import Banner from "./banner/banner";
import Benefit from "./benefit/benefit";
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
