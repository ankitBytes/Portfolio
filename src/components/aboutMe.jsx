import {
  Box,
  Container,
  Typography,
  Stack,
  ImageListItem,
  ImageList,
} from "@mui/material";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { useEffect, useState } from "react";

import Heading from "./shared/heading";
import Content from "./shared/content";

const About = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "About"), (snapshot) => {
      const aboutData = snapshot.docs.map((doc) => doc.data());
      setImages(aboutData[0].imageData);
    });
  }, []);
  return (
    <Box id="about">
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
          direction={{ xs: "column" }}
        >
          <Box>
            <Heading text={"About Me"} align={"start"} />
            <Stack spacing={2} data-aos="fade-up">
              <Content
                text={
                  "Hello! I'm Ankit Kumar Sahu, a final-year B.Tech Computer Science student at Silicon University and a freelance full-stack web developer. My journey in web development began with a curiosity for technology and a drive to create impactful digital solutions. Over the years, I've honed my skills in ReactJS, NodeJS, ExpressJS, MongoDB, and Firebase, enabling me to develop dynamic and efficient web applications."
                }
              />
              <Content
                text={
                  "I thrive on the challenge of turning complex problems into seamless user experiences and am committed to delivering high-quality projects that exceed client expectations. Whether you're looking to build a robust backend, a responsive frontend, or a full-stack solution, I have the expertise to bring your vision to life."
                }
              />
              <Content
                text={
                  "Explore my portfolio to see some of my work, and let's connect to create something amazing together!"
                }
              />
            </Stack>
          </Box>
          <ImageList
            sx={{ width: "100%" }}
            variant="quilted"
            cols={4}
            rows={2}
            gap={8}
            xs={{ cols: 1, rows: 1 }}
          >
            {images?.map((item, i) => (
              <ImageListItem
                key={item.image}
                cols={item.cols || 1}
                rows={item.rows || 1}
                data-aos="fade-right"
                data-aos-duration={1000 * i + 1000}
              >
                <img
                  src={item.image}
                  srcSet={`${item.image}?w=121&h=${item.rows *
                    121}&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.alt}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
