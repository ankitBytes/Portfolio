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
      <Container maxWidth="xl">
        <Heading text={HeadingText} align={"left"} />
        <Timeline>
          {content.map((position, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <Stack padding={"0 1rem"} marginTop={"1rem"} key={index}>
                <Box>
                  <Typography
                    color={"#fafafa"}
                    variant="h4"
                    fontFamily={"Syncopate"}
                    textTransform={"uppercase"}
                    fontWeight={550}
                  >
                    {position.title}
                  </Typography>
                  <Typography
                    color={"#989898"}
                    variant="h6"
                    fontFamily={"Syncopate"}
                    textTransform={"uppercase"}
                    fontWeight={550}
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
                  >
                    {position.location}
                  </Typography>
                  <Typography
                    color={"#989898"}
                    variant="h6"
                    fontFamily={"Syncopate"}
                    textTransform={"uppercase"}
                    fontWeight={550}
                  >
                    {position.duration}
                  </Typography>
                </Box>
                <Box sx={{ padding: "1rem 0 0 0" }}>
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
