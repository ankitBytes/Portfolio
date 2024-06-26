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
  useTheme
} from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import CloseIcon from "@mui/icons-material/Close";

import Heading from "./shared/heading";

const Projects = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = async () =>
      await onSnapshot(collection(db, "Projects"), (snapshot) => {
        const updatedList = snapshot.docs.map((doc) => doc.data());
        setProjects(updatedList);
        console.log(updatedList);
      });
    return () => unsubscribe();
  }, []);

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
        <ImageList variant="masonry" cols={getCols()} gap={8}>
          {projects.map((item, i) => (
            <ImageListItem key={`${item.image}-${i}`}>
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
          src={projectDetail.coverImage}
          style={{ width: "100%", position: "relative", borderRadius: "1rem" }}
          loading="lazy"
          srcSet={`${projectDetail.coverImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
            {projectDetail.skillSet?.map((skill, i) => (
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
    coverImage: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    // skillSet: PropTypes.arrayOf(PropTypes.string).isRequired,
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
            {projectDetail.skillSet.map((skill, i) => (
              <Button
                key={i}
                sx={{
                  color: "white",
                  padding: ".5vh 1vw",
                  margin: 0,
                  background: "#2b2a2a46",
                  fontWeight: "bold",
                  fontFamily: "lato",

                  "&:hover": {
                    background: "#2b2a2a46",
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

export default Projects;

