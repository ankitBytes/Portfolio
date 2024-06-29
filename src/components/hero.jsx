import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

//components
import SideBar from "./shared/sideBar";
import Image from "../assets/IMG_4090.jpg";

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: {xs: '10vh 0', sm: '20vh 0'}
      }}
    >
      <Container
        maxWidth={"xl"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {sm: "space-between", xs: 'center'},
          flexDirection: { sm: 'row', xs: 'column'}
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: { sm: "flex-start", xs: 'center' },
            padding: '5vh 0'
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SideBar display={{ xs: 'none', sm: 'block'}} />
            <Stack>
              <HeadingText text={"welcome"} />
              <HeadingText text={"Everyone"} />
            </Stack>
          </Box>
          <Box
            sx={{
              padding: "2vh 2vw 0",
              alignItems: {xs: 'center', sm: 'inherit'},
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Button
              variant="outlined"
              sx={{
                padding: "1rem 4rem",
                borderRadius: "2rem",
                color: "#fff",
                boxShadow: "#989898 0px 1px 2px 0px",
                transition: "all .5s ease-out",
                fontWeight: "bold",
                fontFamily: "Syncopate",

                "&:hover": {
                  boxShadow: "#989898 0px 20px 30px -10px",
                  border: "1px solid #989898",
                  background: "#fff",
                  color: "black",
                },
              }}
              onClick={() => navigate("/contact")}
            >
              Contact Me
            </Button>

            <Box
              sx={{
                paddingTop: "4vh",
                alignItems: {xs: 'center', sm: 'inherit'},
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography
                color={"#fff"}
                variant="h5"
                fontFamily={"Lato"}
                fontWeight={600}
                textTransform={"uppercase"}
              >
                Passion,{" "}
              </Typography>
              <Typography
                color={"#fff"}
                variant="h5"
                fontFamily={"Lato"}
                fontWeight={400}
                textTransform={"uppercase"}
              >
                Enthusiasm, Innovative{" "}
              </Typography>
              <Typography
                color={"#989898"}
                variant="body1"
                fontFamily={"Lato"}
                fontWeight={400}
                textAlign={"justify"}
                sx={{
                  paddingTop: "2vh",
                }}
              >
                A developer combines Passion for coding with Enthusiasm for
                sports, creating Innovative athletic performance apps.
              </Typography>
            </Box>
          </Box>
        </Box>
        <AboutMeCard />
      </Container>
        {/* <SideText /> */}
    </Box>
  );
};

export const HeadingText = ({ text }) => {
  return (
    <Typography
      color={"#fff"}
      variant="h2"
      fontFamily={"Syncopate"}
      fontWeight={700}
      padding={"0 2vw"}
      textTransform={"uppercase"}
    >
      {text}
    </Typography>
  );
};

export const AboutMeCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <img src={Image} alt="" style={{ width: "50%", maxHeight: "80vh" }} loading="lazy" />
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          color={"#fff"}
          variant="h4"
          fontFamily={"Syncopate"}
          fontWeight={700}
          padding={"0 2vw"}
          textTransform={"uppercase"}
        >
          Ankit Kumar Sahu
        </Typography>
        <Typography
          color={"#989898"}
          variant="h6"
          fontFamily={"Syncopate"}
          fontWeight={400}
          textAlign={"center"}
        >
          Software Developer
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
