import React from "react";
import Homelayout from "../../Homelayout";
import { homeObjOne } from "./Data";

function Home() {
  return (
    <>
      <Homelayout {...homeObjOne} />
    </>
  );
}

export default Home;
