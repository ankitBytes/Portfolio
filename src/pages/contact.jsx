import { Box, Container, Typography, Stack, Button } from "@mui/material";

import { AboutMeCard } from "../components/hero";
import Heading from "../components/shared/heading";
import Content from "../components/shared/content";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Contact = () => {

  const handleClick = (action) => {
    window.location = `${action}`
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "10vh 0", sm: "20vh 0" },
      }}
    >
      <Container
        maxWidth={"xl"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { sm: "space-between", xs: "center" },
          flexDirection: { sm: "row", xs: "column" },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: { sm: "flex-start", xs: "center" },
            padding: "5vh 0",
            maxWidth: { xs: "100%", sm: "50%" },
          }}
          spacing={2}
        >
          <Heading text={"Get in touch"} />
          <Content
            text={
              "Looking to partner or work together? Reach out through the form and I'll get back to you in the next 48 hours. Let's make something amazing happen!"
            }
          />
          <Box>
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <EmailTwoToneIcon color={"white"} sx={{ color: "white" }} />
              <Typography
                variant="h5"
                color={"white"}
                fontFamily={"Rodies"}
                letterSpacing={1}
                sx={{ textDecoration: "underline #A020F0 solid 1px" }}
                onClick={() => handleClick(`mailto:sahuankitkumar60@gmail.com`)}
              >
                sahuankitkumar60@gmail.com
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <GitHubIcon color={"white"} sx={{ color: "white" }} />
              <Typography
                variant="h5"
                color={"white"}
                fontFamily={"Rodies"}
                letterSpacing={1}
                sx={{ textDecoration: "underline #A020F0 solid 1px" }}
                onClick={() => handleClick('https://github.com/ankitBytes')}
                target="_blank"
                component={'a'}
              >
                ankitBytes
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <LinkedInIcon color={"white"} sx={{ color: "white" }} />
              <Typography
                variant="h5"
                color={"white"}
                fontFamily={"Rodies"}
                letterSpacing={1}
                sx={{ textDecoration: "underline #A020F0 solid 1px" }}
                onClick={() => handleClick('https://www.linkedin.com/in/ankit-kumar-sahu/')}
              >
                Ankit Kumar Sahu
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <AboutMeCard />
      </Container>
      {/* <SideText /> */}
    </Box>
  );
};

export default Contact;
