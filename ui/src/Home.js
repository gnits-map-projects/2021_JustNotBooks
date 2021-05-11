import React, { Component } from "react";
import { Fade } from 'react-slideshow-image'
import slide1 from './images/exc.jpeg';
import slide2 from './images/ed1.jpg';
import "./Home.css"
import slide3 from './images/bg3.jpeg'
import slide4 from './images/all.png'
import slide5 from './images/calcu.jpeg'
import Marquee from "react-fast-marquee";
import "./index.css"
import Nav from "./Nav.js"
import { useState } from "react";
import { useEffect } from "react";

const properties = {
  duration: 2000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false
}
const Home = () => {
  const [transac, setTransac] = useState([]);
  useEffect(() => {
    fetchTransac();
  }, []);
  const fetchTransac = async () => {
    const transacCountfromDb = await fetch("http://localhost:9000/totaltransac");
    const response = await transacCountfromDb.json();
    setTransac(response);
  };
  return (
    <div>
      <Nav />
      <Marquee>
        <b style={{ "whiteSpace": "nowrap" }}>More than 500 exchanges happen among students through this platform every academic year.You have exchanged {transac} items.</b>
      </Marquee>
      <div className="homepage">
        <div className='about'><h2>About</h2>
          <p>
            JustNotBooks marketplace is a platform for buying, selling, borrowing and donating services and goods such as electronics, items,
            Every academic year, a lot of things (books, notes, drafters, mobile and computer accessories, etc) gets exchanged among students within different colleges and schools.
            Extending the sharing phenomenon to happen across different institutions in the city.
        </p></div>
        <div className="pictures">
          <Fade {...properties}>
            <div className="slideshow">
              <div><img src={slide1} /></div>
            </div>
            <div className="slideshow">
              <div><img src={slide2} /></div>
            </div>
            <div className="slideshow" >
              <div><img src={slide3} /></div>
            </div>
            <div className="slideshow" >
              <div><img src={slide4} /></div>
            </div>
            <div className="slideshow" >
              <div><img src={slide5} /></div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default Home;