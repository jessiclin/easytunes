import React from "react";
import "./Homelayout.css";
import { Button } from "../../Button/Button";
import { Link } from "react-router-dom";


function Homelayout({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  imgStart,
}) {
  return (
    <>
      <div className={lightBg ? "home__hero-section" : "home__hero-section darkBg"}>
        <div className="container home-container">
          <div className="row home__hero-row home-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}>

            <div className="col home-col">
              <div className="home__hero-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? "heading" : "heading dark"}>
                  {headline}
                </h1>
                <p className={lightTextDesc ? "home__hero-subtitle" : "home__hero-subtitle dark"}>
                  {description}
                </p>
                <Link to="/register">
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homelayout;
