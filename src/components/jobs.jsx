import { useEffect, useState } from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Heading from "./shared/heading";
import Content from "./shared/content";

import PropTypes from "prop-types";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Jobs = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Experience"), (snapshot) => {
      const updatedList = snapshot.docs.map((doc) => doc.data());
      setExperience(updatedList);
      console.log(experience);
    });

    return () => unsubscribe();
  }, []);
  return <Template HeadingText={"Experience"} content={experience} />;
};

export const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Education"), (snapshot) => {
      const updatedList = snapshot.docs.map((doc) => doc.data());
      setEducation(updatedList);
      console.log(education);
    });

    return () => unsubscribe();
  }, []);
  return <Template HeadingText={"Education"} content={education} />;
};

const Template = ({ HeadingText, content }) => {
  return (
    <Box
      sx={{
        margin: "5rem 0",

        "& .MuiTimelineItem-root::before": {
          padding: "0",
        },
      }}
    >
      <Container maxWidth="xl" data-aos-offset="500">
        <Heading text={HeadingText} align={"left"} />
        <Timeline>
          {content.map((position, i) => (
            <TimelineItem key={i}>
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  sx={{ borderColor: "rgb(54, 255, 5)", borderWidth: ".2rem" }}
                />
                <TimelineConnector sx={{ backgroundColor: "#505050" }} />
              </TimelineSeparator>
              <Stack padding={"0 1rem"} marginTop={"1rem"} key={i}>
                <Box>
                  <Typography
                    color={"#fafafa"}
                    variant="h4"
                    fontFamily={"Syncopate"}
                    textTransform={"uppercase"}
                    fontWeight={550}
                    data-aos="fade-left"
                    data-aos-duration={2000 * i + 1000}
                  >
                    {position.title}
                  </Typography>
                  <Typography
                    color={"#989898"}
                    variant="h6"
                    fontFamily={"Syncopate"}
                    textTransform={"uppercase"}
                    fontWeight={550}
                    data-aos="fade-left"
                    data-aos-duration={2000 * i + 1200}
                    data-aos-delay={i === 0 ? 300 : 300 * i}
                  >
                    {position.schoolName}
                  </Typography>
                  <Typography
                    color={"#989898"}
                    variant="h6"
                    fontFamily={"Syncopate"}
                    textTransform={"uppercase"}
                    fontWeight={550}
                    display={position.location ? "block" : "none"}
                    data-aos="fade-left"
                    data-aos-duration={2000 * i + 1400}
                    data-aos-delay={i === 0 ? 300 : 300 * i}
                  >
                    {position.location}
                  </Typography>
                  <Typography
                    color={"#989898"}
                    variant="h6"
                    fontFamily={"Syncopate"}
                    textTransform={"uppercase"}
                    fontWeight={550}
                    data-aos="fade-left"
                    data-aos-duration={2000 * i + 1600}
                    data-aos-delay={i === 0 ? 300 : 300 * i}
                  >
                    {position.duration}
                  </Typography>
                </Box>
                <Box
                  sx={{ padding: "1rem 0 0 0" }}
                  data-aos="fade-left"
                  data-aos-duration={2000 * i + 1800}
                  data-aos-delay={i === 0 ? 300 : 300 * i}
                >
                  <Content text={position.description} />
                </Box>
              </Stack>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};

Template.propTypes = {
  HeadingText: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string,
      duration: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Jobs;
