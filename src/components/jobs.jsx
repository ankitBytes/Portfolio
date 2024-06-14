import { Box, Stack, Typography, Container } from "@mui/material";

import Heading from "./shared/heading";
import Content from "./shared/content";

import PropTypes from "prop-types";

const Jobs = () => {
  return <Template HeadingText={"Experience"} content={Position} />;
};

export const Education = () => {
  return <Template HeadingText={"Education"} content={EducationData} />;
};

const Template = ({ HeadingText, content }) => {
  return (
    <Box sx={{ margin: "5rem 0" }}>
      <Container maxWidth="xl">
        <Heading text={HeadingText} align={"left"} />
        {content?.map((position, index) => (
          <Stack
            padding={"2rem 1rem"}
            sx={{ border: "1px solid #989898", borderRadius: "1rem" }}
            marginTop={"1rem"}
            key={index}
          >
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
                {position.name}
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
        ))}
      </Container>
    </Box>
  );
};

Template.prototype = {
    HeadingText: PropTypes.string.isRequired,
    content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    duration: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const Position = [
  {
    title: "Freelancer",
    name: "LeafLets",
    duration: "May 2023 - Present",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies rutrum nisl, sed tincidunt orci aliquet sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin eget purus euismod, feugiat lorem ac, pretium neque. Phasellus a mollis purus. Vivamus cursus porta justo, eget tristique dolor faucibus vitae. Donec placerat dolor erat, vitae iaculis nibh consectetur id. Quisque volutpat nulla non lorem mattis lacinia. Fusce interdum, lectus quis fermentum luctus, lorem est lacinia odio, et egestas eros elit quis libero. Pellentesque tincidunt sapien id odio congue, quis dapibus lectus consectetur. Pellentesque facilisis, nisl ac molestie euismod, nisi orci ultrices mauris, id tristique ipsum lacus eu augue. Nunc maximus at nulla vitae tincidunt. Mauris molestie efficitur porttitor. Maecenas ut magna at augue aliquet tempus.`,
  },
];
const EducationData = [
  {
    title: "Bachelor Of Technology",
    duration: "DEC 2021 - Present",
    location: "Bhubaneswar, Odisha",
    name: "Silicon University",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies rutrum nisl, sed tincidunt orci aliquet sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin eget purus euismod, feugiat lorem ac, pretium neque. Phasellus a mollis purus. Vivamus cursus porta justo, eget tristique dolor faucibus vitae. Donec placerat dolor erat, vitae iaculis nibh consectetur id. Quisque volutpat nulla non lorem mattis lacinia. Fusce interdum, lectus quis fermentum luctus, lorem est lacinia odio, et egestas eros elit quis libero. Pellentesque tincidunt sapien id odio congue, quis dapibus lectus consectetur. Pellentesque facilisis, nisl ac molestie euismod, nisi orci ultrices mauris, id tristique ipsum lacus eu augue. Nunc maximus at nulla vitae tincidunt. Mauris molestie efficitur porttitor. Maecenas ut magna at augue aliquet tempus.`,
  },
  {
    title: "Intermediate",
    duration: "JUN 2019 - Apr 2021",
    location: "Phulbani, Odisha",
    name: "Kendriya Vidyalaya",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies rutrum nisl, sed tincidunt orci aliquet sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin eget purus euismod, feugiat lorem ac, pretium neque. Phasellus a mollis purus. Vivamus cursus porta justo, eget tristique dolor faucibus vitae. Donec placerat dolor erat, vitae iaculis nibh consectetur id. Quisque volutpat nulla non lorem mattis lacinia. Fusce interdum, lectus quis fermentum luctus, lorem est lacinia odio, et egestas eros elit quis libero. Pellentesque tincidunt sapien id odio congue, quis dapibus lectus consectetur. Pellentesque facilisis, nisl ac molestie euismod, nisi orci ultrices mauris, id tristique ipsum lacus eu augue. Nunc maximus at nulla vitae tincidunt. Mauris molestie efficitur porttitor. Maecenas ut magna at augue aliquet tempus.`,
  },
  {
    title: "matriculation",
    duration: "apr 2018 - apr 2019",
    location: "Phulbani, Odisha",
    name: "Kendriya Vidyalaya",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies rutrum nisl, sed tincidunt orci aliquet sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin eget purus euismod, feugiat lorem ac, pretium neque. Phasellus a mollis purus. Vivamus cursus porta justo, eget tristique dolor faucibus vitae. Donec placerat dolor erat, vitae iaculis nibh consectetur id. Quisque volutpat nulla non lorem mattis lacinia. Fusce interdum, lectus quis fermentum luctus, lorem est lacinia odio, et egestas eros elit quis libero. Pellentesque tincidunt sapien id odio congue, quis dapibus lectus consectetur. Pellentesque facilisis, nisl ac molestie euismod, nisi orci ultrices mauris, id tristique ipsum lacus eu augue. Nunc maximus at nulla vitae tincidunt. Mauris molestie efficitur porttitor. Maecenas ut magna at augue aliquet tempus.`,
  },
];

export default Jobs;
