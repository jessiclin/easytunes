import React from "react";
import Homelayout from "../Layouts/Home/Homelayout";
import { homeObjOne } from "./Data";
import Navbar from '../Navbar/Navbar'
function Home() {
  return (
    <>
        <Navbar/>
      <Homelayout {...homeObjOne} />
    </>
  );
}

export default Home;
