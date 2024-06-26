import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Skills() {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Skills"), (snapshot) => {
      const updatedList = snapshot.docs.map((doc) => doc.data().skills).flat();
      setSkills(updatedList);
      console.log(updatedList);
    });

    return () => unsubscribe();
  }, [])


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container" style={{ padding: '20vh 0 15vh'}}>
      <Slider
        {...settings}>
        {skills.map((skill, index) => (
          <Typography
            key={index}
            color={"#989898"}
            variant="h4"
            fontFamily={"Sofia"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            {skill}
          </Typography>
        ))}
      </Slider>
    </div>
  );
}

export default Skills;
