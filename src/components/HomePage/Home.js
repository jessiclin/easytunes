import React from "react";
import Homelayout from "../Layouts/Home/Homelayout";
import { homeObjOne } from "./Data";

function Home() {
  return (
    <>
      <Homelayout {...homeObjOne} />
    </>
  );
}

export default Home;
