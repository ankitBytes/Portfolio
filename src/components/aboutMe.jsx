import { Box, Container, Typography, Stack } from "@mui/material";

import Heading from "./shared/heading";
import Content from "./shared/content";

import SideImg from "../assets/developerAbout.jpg";

const About = () => {
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        maxWidth="xl"
      >
        <Stack
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={{ sm: "row", xs: "column" }}
        >
          <Box>
            <Heading text={"About"} align={"start"} />
            <Content
              text={
                "Hello! I'm Ankit Kumar Sahu, a final-year B.Tech Computer Science student at Silicon University and a freelance full stack web developer. I specialize in ReactJS, NodeJS, ExpressJS, MongoDB, and Firebase. With a passion for creating dynamic web solutions, I thrive on delivering high-quality projects. Explore my portfolio and let's connect to build something amazing!"
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: {xs: '2vh 0', sm: '0'}
            }}
          >
            <Box
              sx={{
                background: "#1e1e1e",
                maxWidth: {sm: "70%", xs: '100%'},
                padding: "2vh 1vw",
                borderRadius: "10px",
                boxShadow:
                  "rgba(222, 222, 222, 0.1) 0px 8px 24px, rgba(222, 222, 222, 0.1) 0px 16px 56px, rgba(222, 222, 222, 0.1) 0px 24px 80px",

                "@keyframes floating": {
                  "0%": {
                    transform: "translateY(0)",
                  },
                  "50%": {
                    transform: "translateY(-5px)",
                  },
                  "100%": {
                    transform: "translate(0)",
                  },
                },

                animation: "floating 3s ease-in-out infinite",
              }}
            >
              <img
                src={SideImg}
                alt=""
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
