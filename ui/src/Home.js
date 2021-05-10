import React, { Component } from "react";
import { Slide } from 'react-slideshow-image'
import slide1 from './images/exc.jpeg';
import slide2 from './images/ed1.jpg';
import "./Home.css"

import slide3 from './images/bg3.jpeg'
import slide4 from './images/all.png'
import slide5 from './images/calcu.jpeg'

import Marquee from "react-fast-marquee";
import "./index.css"
import Nav from "./Nav.js"

const properties = {
  duration: 2000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false
}


const Home = () => {
  return (
    <div>
      <Nav />
      <Marquee>
        <b style={{ "whiteSpace": "nowrap" }}>More than 500 exchanges among students of different schools and colleges happen through this platform every year.</b>
      </Marquee>
      <div className="containerSlide" id="a">
        <Slide {...properties}>
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
        </Slide>
      </div>
      <div className="about" id="b">
        <b><h2>About</h2></b>
        <p>
          JustNotBooks marketplace is a platform for buying, selling, borrowing and donating services and goods such as electronics, items,
          Every academic year, a lot of things (books, notes, drafters, mobile and computer accessories, etc) gets exchanged among students within different colleges and schools.
          Extending the sharing phenomenon to happen across different institutions in the city.
        </p>
      </div>
    </div>
  )
}

export default Home;