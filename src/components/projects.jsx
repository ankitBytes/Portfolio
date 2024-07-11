import {
  Box,
  Container,
  Typography,
  Modal,
  Button,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import VanillaTilt from "vanilla-tilt";

import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";

import Heading from "./shared/heading";

const Projects = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Projects"), (snapshot) => {
      const updatedList = snapshot.docs.map((doc) => doc.data());
      setProjects(updatedList);
      console.log(updatedList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const tiltElements = document.querySelectorAll(".tilt");
    VanillaTilt.init(tiltElements, {
      max: 15,
      perspective: 1400,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      speed: 1200,
      glare: true,
      "max-glare": 0.2,
      "transform-style": "preserve-3d",
      transform: "translateZ(20px)",
      gyroscope: true,
    });
  }, [projects]);

  const getCols = () => {
    if (isMd) return 3;
    if (isSm) return 2;
    if (isXs) return 1;
    return 3; // default to 3 columns for larger screens if none of the conditions match
  };

  return (
    <Box sx={{ padding: "10vh 0" }} id="projects">
      <Container maxWidth="xl">
        <Heading text={"Previous Works"} align={"start"} />
        <ImageList
          variant="masonry"
          cols={getCols()}
          gap={10}
          sx={{ overflow: "hidden", padding: "5vh 0" }}
        >
          {projects.map((item, i) => (
            <ImageListItem
              key={`${item.image}-${i}`}
              data-aos="fade-left"
              data-aos-duration={1000 * i + 1000}
            >
              <ProjectCard projectDetail={item} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Box>
  );
};

export const ProjectCard = ({ projectDetail }) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);

  return (
    <Box
      className="tilt"
      sx={{
        position: "relative",
        transition: "all 0.35s ease-in-out",
        padding: "1rem",
        border: "0",
        "&:hover": {
          border: "1px solid #989898",
        },
        "&:active": {
          transform: "scale(0.9)",
        },
      }}
      onClick={handleModalOpen}
    >
      <Stack spacing={1} sx={{ position: "relative" }}>
        {projectDetail.coverImage ? (
          <img
            src={projectDetail.coverImage}
            style={{ width: "100%", position: "relative" }}
            loading="lazy"
            srcSet={`${projectDetail.coverImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
          />
        ) : (
          <Typography color={"#989898"}>Project</Typography>
        )}
        <Stack
          sx={{
            top: "10%",
            left: "10%",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
          spacing={1}
        >
          <Typography
            color={"#fff"}
            variant="h6"
            textTransform={"uppercase"}
            fontFamily={"Syncopate"}
            fontWeight={600}
            sx={{
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              maxHeight: "4em",
            }}
          >
            {projectDetail.projectTitle}
          </Typography>
          <Typography
            color={"#fff"}
            variant="body1"
            fontFamily={"Laso"}
            sx={{
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              maxHeight: "4.5em", // Adjust as needed for your font and line height
            }}
          >
            {projectDetail.projectDescription}
          </Typography>
          <Stack spacing={1} direction={"row"} padding={"1rem 0"}>
            {projectDetail.skillSet?.map((skill, i) => (
              <Button
                key={i}
                sx={{
                  color: "white",
                  padding: ".5vh 1vw",
                  margin: 0,
                  background: "#989898",
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
        </Stack>
      </Stack>
    </Box>
  );
};

ProjectCard.propTypes = {
  projectDetail: PropTypes.shape({
    coverImage: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    skillSet: PropTypes.objectOf(PropTypes.string).isRequired,
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

  const handleLinkRedirect = (link) => {
    window.open(link, "_blank");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "#5757575f",
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
            <LinkIcon
              sx={{ color: "#526cff", padding: "0 1vw", fontSize: "3rem" }}
              onClick={() => handleLinkRedirect(projectDetail.projectLink)}
            />
          </Typography>
          <Stack spacing={1} direction={"row"} paddingTop={"1vh"}>
            {projectDetail.skillSet.map((skill, i) => (
              <Button
                key={i}
                sx={{
                  color: "white",
                  padding: ".5vh 1vw",
                  margin: 0,
                  background: "#989898",
                  fontWeight: "bold",
                  fontFamily: "lato",

                  "&:hover": {
                    background: "#989898",
                  },
                }}
              >
                {skill}
              </Button>
            ))}
          </Stack>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, whiteSpace: "pre-wrap" }}
          >
            {projectDetail.projectDescription}
          </Typography>
          {projectDetail?.downloadURLs.map((images, i) => (
            <img
              src={images}
              style={{ width: "100%", padding: "3vh 0", maxHeight: "80vh" }}
              key={i}
            />
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

ProjectModal.propTypes = {
  projectDetail: PropTypes.shape({
    coverImage: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    // skillSet: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

// const projects = [
//   {
//     coverImage: Image,
//     projectTitle: "Trial",
//     projectDescription: `
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies rutrum nisl, sed tincidunt orci aliquet sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin eget purus euismod, feugiat lorem ac, pretium neque. Phasellus a mollis purus. Vivamus cursus porta justo, eget tristique dolor faucibus vitae. Donec placerat dolor erat, vitae iaculis nibh consectetur id. Quisque volutpat nulla non lorem mattis lacinia. Fusce interdum, lectus quis fermentum luctus, lorem est lacinia odio, et egestas eros elit quis libero. Pellentesque tincidunt sapien id odio congue, quis dapibus lectus consectetur. Pellentesque facilisis, nisl ac molestie euismod, nisi orci ultrices mauris, id tristique ipsum lacus eu augue. Nunc maximus at nulla vitae tincidunt. Mauris molestie efficitur porttitor. Maecenas ut magna at augue aliquet tempus.

//     Quisque sed nisl purus. Etiam tortor leo, auctor non eros vel, maximus blandit ligula. Maecenas hendrerit odio sed odio sodales, nec scelerisque est hendrerit. Phasellus erat mauris, mollis sit amet finibus id, pharetra vel mi. Suspendisse et molestie urna. Nam pellentesque sed ante a volutpat. Ut placerat tempus diam in malesuada. Phasellus et odio sit amet ligula accumsan porta.

//     Ut purus turpis, pellentesque eu porttitor sodales, gravida in magna. Praesent tincidunt placerat iaculis. Quisque facilisis elit ac augue vehicula tincidunt et id dolor. Nullam dictum imperdiet suscipit. Nunc ut felis sed diam maximus porta a eget diam. Vivamus suscipit suscipit faucibus. Duis pellentesque orci non est blandit facilisis. Sed consequat lectus ac ullamcorper faucibus. Mauris quis nisi vel erat lobortis ornare eget porta dui. Aliquam non erat odio. Quisque finibus convallis eros ac pulvinar.`,
//     skillSet: ["ReactJs", "NodeJs", "Firebase"],
//   },
//   {
//     coverImage: Image,
//     projectTitle: "Trial",
//     projectDescription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
//     skillSet: ["ReactJs", "NodeJs", "Firebase", "ExpressJs"],
//   },
//   {
//     coverImage: Image,
//     projectTitle: "Trial",
//     projectDescription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
//     skillSet: ["ReactJs", "NodeJs", "Firebase"],
//   },
//   {
//     coverImage: Image,
//     projectTitle: "Trial",
//     projectDescription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
//     skillSet: ["ReactJs", "NodeJs", "Firebase"],
//   },
//   {
//     coverImage: Image,
//     projectTitle: "Trial",
//     projectDescription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
//     skillSet: ["ReactJs", "NodeJs", "Firebase"],
//   },
//   {
//     coverImage: Image,
//     projectTitle: "Trial",
//     projectDescription:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a, suscipit natus optio voluptatibus vero, accusantium cupiditate pariatur expedita beatae qui consequatur totam culpa magni nemo, maiores enim debitis error",
//     skillSet: ["ReactJs", "NodeJs", "Firebase"],
//   },
// ];

export default Projects;
