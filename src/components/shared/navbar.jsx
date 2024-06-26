import * as React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const buttons = {
    padding: "2vh 2vw",
    cursor: "pointer",
    color: "white",
    "text-transform": "uppercase",
    "font-weight": "bold",
    transition: "all .5s ease-out",

    "&:hover": {
      color: "#7fff7f",
      transform: "scale(1.1)",
    },
  };

  const [menu, setMenu] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  const navigate = useNavigate();

  const handleScrollSection = (e) => {
    const element = document.getElementById(e);
    console.log(element);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenu(false);
    }
  }

  return (
    <Box
      sx={{
        marginBottom: "3.5rem",
        position: "absolute",
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        width={"100%"}
        sx={{
          padding: "1vh 2vw",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"center"}
        >
          <Typography
            color={"white"}
            fontFamily={"Dancing Script"}
            variant="h2"
          >
            Ankit
          </Typography>
          <Stack direction={"row"} display={{ xs: "none", sm: "flex" }}>
            <Typography sx={buttons} className="navButton" onClick={() => navigate("/")}>Home</Typography>
            <Typography sx={buttons} className="navButton" onClick={() => handleScrollSection("about")}>About</Typography>
            <Typography sx={buttons} className="navButton" onClick={() => handleScrollSection("projects")}>Projects</Typography>
            <Typography sx={buttons} className="navButton"  onClick={() => navigate("/contact")}>Contact</Typography>
          </Stack>
          <Box display={{ xs: "block", sm: "none" }}>
            <MenuIcon
              sx={{
                color: "white",
                padding: "0 4vw",
                cursor: "pointer",
                display: menu ? "none" : "block",
              }}
              onClick={() => {
                setMenu(true);
                setAnimate(true);
              }}
            />
            <Box
              sx={{
                "@keyframes fadeIn": {
                  from: {
                    opacity: 0,
                    transform: "translateX(100%)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
                "@keyframes fadeOut": {
                  from: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                  to: {
                    opacity: 0,
                    transform: "translateX(100%)",
                  },
                },
                display: menu ? "flex" : "none",
                position: "absolute",
                right: "2vw",
                top: 0,
                height: "100vh",
                width: "100vw",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flexDirection: "column",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                animation: animate ? "fadeIn 0.5s" : "fadeOut 0.5s",
                padding: "4vh 0",
              }}
            >
              <Box sx={{ padding: "0 4vw" }}>
                <CloseIcon
                  sx={{
                    color: "white",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setAnimate(false);
                    setTimeout(() => setMenu(false), 500);
                  }}
                />
              </Box>
              <Stack
                direction={"column"}
                height={"100%"}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography sx={buttons} onClick={() => navigate("/")}>Home</Typography>
                <Typography sx={buttons} onClick={() => handleScrollSection("about")}>About</Typography>
                <Typography sx={buttons}>Projects</Typography>
                <Typography sx={buttons} onClick={() => navigate("/contact")}>Contact</Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
