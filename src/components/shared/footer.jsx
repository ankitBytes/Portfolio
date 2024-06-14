import { Box, Container, Stack, Typography, Button } from "@mui/material";
import SideBar from "./sideBar";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "10vh 0",
        borderTop: "1px solid #989898",
        borderLeft: "1px solid #989898",
        borderRadius: "4rem 0 0 0",
        marginTop: "5vh",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Stack spacing={2} alignItems={"center"}>
            <Typography
              color={"#fff"}
              fontFamily={"Syncopate"}
              fontWeight={700}
              textTransform={"uppercase"}
              variant="h5"
              textAlign={"center"}
            >
              Interested in working together?
            </Typography>
            <Stack>
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
                  width: "100%",

                  "&:hover": {
                    boxShadow: "#989898 0px 20px 30px -10px",
                    border: "1px solid #989898",
                    background: "#fff",
                    color: "black",
                  },
                }}
              >
                Contact Me
              </Button>
            </Stack>
          </Stack>
          <Stack>
            <Typography
              color={"#fff"}
              fontFamily={"Syncopate"}
              fontWeight={700}
              padding={"0 2vw"}
              textTransform={"uppercase"}
              variant="body1"
            >
              ©2023 All Rights Reserved.
            </Typography>
            <Typography
              color={"#fff"}
              fontFamily={"Syncopate"}
              fontWeight={700}
              padding={"0 2vw"}
              textTransform={"uppercase"}
              variant="body1"
            >
              Made with 💜 by Ankit
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ paddingTop: "5vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SideBar direction={"row"} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
