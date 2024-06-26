import { Box, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { fontSize } from "@mui/system";

const SideBar = ({ direction }) => {
  const Icon = {
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease-in",
    fontSize: "1.4rem",

    "&:hover": {
      color: "#bbff00",
    },
  };

  return (
    <Box>
      <Stack
        spacing={4}
        direction={direction}
        display={{ xs: direction === "row" ? "flex" : "none", sm: "flex" }}
      >
        <a
          href="https://github.com/ankitBytes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon sx={Icon} />
        </a>
        <a
          href="https://x.com/Ankitkumarsa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIcon sx={Icon} />
        </a>
        <a
          href="https://www.linkedin.com/in/ankit-kumar-sahu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon sx={Icon} />
        </a>
      </Stack>
    </Box>
  );
};

export default SideBar;
