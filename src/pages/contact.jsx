import { Box, Container, Typography, Stack, Button } from "@mui/material";

import { AboutMeCard } from "../components/hero";
import Heading from "../components/shared/heading";
import Content from "../components/shared/content";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";

const Contact = () => {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: { sm: "flex-start", xs: "center" },
            padding: "5vh 0",
            maxWidth: { xs: "100%", sm: "50%" },
          }}
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
              >
                sahuankitkumar60@gmail.com
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <LocalPhoneTwoToneIcon color={"white"} sx={{ color: "white" }} />
              <Typography
                variant="h5"
                color={"white"}
                fontFamily={"Rodies"}
                letterSpacing={1}
                sx={{ textDecoration: "underline #A020F0 solid 1px" }}
              >
                +91 7846996759
              </Typography>
            </Stack>
          </Box>
        </Box>
        <AboutMeCard />
      </Container>
      {/* <SideText /> */}
    </Box>
  );
};

export default Contact;
