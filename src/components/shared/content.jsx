import { Typography } from "@mui/material";

const Content = ({ text, variant, color }) => {
  return (
    <Typography
      color={color ? color : "white"}
      fontFamily={"Lato"}
      textAlign={"justify"}
          variant={variant ? variant : "h6"}
          paragraph="true"
    >
      {text}
    </Typography>
  );
};

export default Content;
