import { useEffect, useState } from "react";
import { Box, Grid, Icon } from "@mui/material";

import ReactIcon from "../assets/icons_skills_section/react.png";
import Javascript from "../assets/icons_skills_section/javascript.png";
import HTML from "../assets/icons_skills_section/html.png";
import CSS from "../assets/icons_skills_section/css.png";
import Node from "../assets/icons_skills_section/node.png";
import MongoDB from "../assets/icons_skills_section/mongodb.png";
import Firebase from "../assets/icons_skills_section/firebase.png";

const skillIcons = [ReactIcon, Javascript, HTML, CSS, Node, MongoDB, Firebase];

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

// Function to repeat the skillIcons array multiple times
const repeatArray = (array, times) => {
  let repeatedArray = [];
  for (let i = 0; i < times; i++) {
    repeatedArray = repeatedArray.concat(array);
  }
  return repeatedArray;
};

const Skills = () => {
  const [shuffledIcons, setShuffledIcons] = useState([]);

  useEffect(() => {
    const repeatedIcons = repeatArray(skillIcons, 3); // Repeat the array 3 times
    setShuffledIcons(shuffleArray(repeatedIcons));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container maxWidth={"xl"} gap={3} justifyContent={"center"}>
        {shuffledIcons.map((icon, index) => (
          <Grid item xs={1.5} sm={1} key={index}>
            <Icon sx={{ fontSize: { xs: '10vw', sm: '5vw' }, padding: '0 1vw' }}>
              <img src={icon} style={{ maxWidth: "100%" }} alt="" />
            </Icon>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;
