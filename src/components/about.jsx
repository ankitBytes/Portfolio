import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";

import SendIcon from '@mui/icons-material/Send';

export default function About() {
  const styles = {
    root: css`
      color: black;
      background: #eaeaea;
      height: 90vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
    `,

    heading: css`
      width: 100%;
    `,

    subHeading: css`
      width: 100%;
    `,

    projectBtn: css`
        background-color: #3075a1;
        box-shadow: none;
    `
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="xl">
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h2" align="center" sx={styles.heading}>
            HEY, I'M ANKIT KUMAR SAHU
          </Typography>
          <Typography variant="h6" align="center" sx={styles.subHeading}>
          Versatile full-stack web developer experienced in both frontend and backend technologies. Passionate about designing and implementing scalable solutions, collaborating with cross-functional teams, and delivering exceptional user experiences.
          </Typography>
          <Button variant="contained" endIcon={<SendIcon />} sx={styles.projectBtn}>
        PROJECTS
      </Button>
        </Stack>
      </Container>
    </Box>
  );
}
