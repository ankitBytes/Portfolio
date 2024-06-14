import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import Heading from "./shared/heading";

import Image from "../assets/background.png";
import { maxHeight } from "@mui/system";

const Projects = () => {
  return (
    <Box sx={{ padding: "10vh 0" }}>
      <Container maxWidth="xl">
        <Heading text={"Previous Works"} align={"start"} />
        <Grid
          container
          gap={{md: 2, sm: 1}}
          sx={{ padding: "4vh 0" }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {projects.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={3.9}
              key={index}
              className="projectsImages"
            >
              <ProjectCard projectDetail={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const ProjectCard = ({ projectDetail }) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);

  return (
    <Box
      sx={{
        position: "relative",
        transition: "all 0.35s ease-in-out",
        "&:hover .infoBox": {
          opacity: 1,
          transform: "scale(1)",
          zIndex: 1000,
        },
        "&:active": {
          transform: "scale(0.9)",
        },
      }}
      onClick={handleModalOpen}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={projectDetail.image}
          style={{ width: "100%", position: "relative", borderRadius: "1rem" }}
        />
        <Box
          className="infoBox"
          sx={{
            position: "absolute",
            maxHeight: "80%",
            maxWidth: "80%",
            top: "10%",
            left: "10%",
            opacity: 0,
            transform: "scale(0.8)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <Typography
            color={"#fff"}
            variant="h6"
            textTransform={"uppercase"}
            fontFamily={"Syncopate"}
            fontWeight={600}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {projectDetail.projectTitle}
          </Typography>
          <Typography
            color={"#fff"}
            variant="body1"
            fontFamily={"Laso"}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {projectDetail.projectDescription}
          </Typography>
          <Stack spacing={1} direction={"row"} padding={"1rem 0"}>
            {projectDetail.skills.map((skill, i) => (
              <Button
                key={i}
                sx={{
                  color: "white",
                  padding: ".5vh 1vw",
                  margin: 0,
                  background: "#2b2a2a46",
                  fontWeight: "bold",
                  fontFamily: "lato",
                  display: i < 3 ? "block" : "none",

                  "&:hover": {
                    background: "#2b2a2a46",
                  },
                }}
              >
                {skill}
              </Button>
            ))}
          </Stack>
          <ProjectModal
            projectDetail={projectDetail}
            open={open}
            setOpen={setOpen}
          />
        </Box>
      </Box>
    </Box>
  );
};

ProjectCard.propTypes = {
  projectDetail: PropTypes.shape({
    image: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const ProjectModal = ({ projectDetail, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevents the click event from propagating to the parent element
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "#ffffff46",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: 1000,
    backdropFilter: "blur(6px)",
    color: "#fff",
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal
        open={open}
        onClick={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          zIndex: 1000,
        }}
      >
        <Box sx={style} onClick={(e) => e.stopPropagation()}>
          {" "}
          {/* Prevent the modal box from closing when clicked */}
          <CloseIcon
            onClick={handleButtonClick}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 16,
              top: 16,
            }}
          />
          <Typography
            id="modal-modal-title"
            variant="h4"
            textTransform={"uppercase"}
            fontFamily={"Syncopate"}
            fontWeight={600}
          >
            {projectDetail.projectTitle}
          </Typography>
          <Stack spacing={1} direction={"row"} paddingTop={"1vh"}>
            {projectDetail.skills.map((skill, i) => (
              <Button
                key={i}
                sx={{
                  color: "white",
                  padding: ".5vh 1vw",
                  margin: 0,
                  background: "#2b2a2a46",
                  fontWeight: "bold",
                  fontFamily: "lato",
                  display: i < 3 ? "block" : "none",

                  "&:hover": {
                    background: "#2b2a2a46",
                  },
                }}
              >
                {skill}
              </Button>
            ))}
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
            {projectDetail.projectDescription}
          </Typography>
          <img
            src={projectDetail.image}
            style={{ width: "100%", padding: "3vh 0", maxHeight: "80vh" }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

ProjectModal.propTypes = {
  projectDetail: PropTypes.shape({
    image: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    skills: PropTypes.object.isRequired
  }).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const projects = [
  {
    image: Image,
    projectTitle: "Trial",
    projectDescription: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies rutrum nisl, sed tincidunt orci aliquet sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin eget purus euismod, feugiat lorem ac, pretium neque. Phasellus a mollis purus. Vivamus cursus porta justo, eget tristique dolor faucibus vitae. Donec placerat dolor erat, vitae iaculis nibh consectetur id. Quisque volutpat nulla non lorem mattis lacinia. Fusce interdum, lectus quis fermentum luctus, lorem est lacinia odio, et egestas eros elit quis libero. Pellentesque tincidunt sapien id odio congue, quis dapibus lectus consectetur. Pellentesque facilisis, nisl ac molestie euismod, nisi orci ultrices mauris, id tristique ipsum lacus eu augue. Nunc maximus at nulla vitae tincidunt. Mauris molestie efficitur porttitor. Maecenas ut magna at augue aliquet tempus.
    
    Quisque sed nisl purus. Etiam tortor leo, auctor non eros vel, maximus blandit ligula. Maecenas hendrerit odio sed odio sodales, nec scelerisque est hendrerit. Phasellus erat mauris, mollis sit amet finibus id, pharetra vel mi. Suspendisse et molestie urna. Nam pellentesque sed ante a volutpat. Ut placerat tempus diam in malesuada. Phasellus et odio sit amet ligula accumsan porta.
    
    Ut purus turpis, pellentesque eu porttitor sodales, gravida in magna. Praesent tincidunt placerat iaculis. Quisque facilisis elit ac augue vehicula tincidunt et id dolor. Nullam dictum imperdiet suscipit. Nunc ut felis sed diam maximus porta a eget diam. Vivamus suscipit suscipit faucibus. Duis pellentesque orci non est blandit facilisis. Sed consequat lectus ac ullamcorper faucibus. Mauris quis nisi vel erat lobortis ornare eget porta dui. Aliquam non erat odio. Quisque finibus convallis eros ac pulvinar.`,
    skills: ["ReactJs", "NodeJs", "Firebase"],
  },
  {
    image: Image,
    projectTitle: "Trial",
    projectDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
    skills: ["ReactJs", "NodeJs", "Firebase", "ExpressJs"],
  },
  {
    image: Image,
    projectTitle: "Trial",
    projectDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
    skills: ["ReactJs", "NodeJs", "Firebase"],
  },
  {
    image: Image,
    projectTitle: "Trial",
    projectDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
    skills: ["ReactJs", "NodeJs", "Firebase"],
  },
  {
    image: Image,
    projectTitle: "Trial",
    projectDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
    skills: ["ReactJs", "NodeJs", "Firebase"],
  },
  {
    image: Image,
    projectTitle: "Trial",
    projectDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
    skills: ["ReactJs", "NodeJs", "Firebase"],
  },
];

export default Projects;
