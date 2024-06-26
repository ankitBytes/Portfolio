import { Typography } from "@mui/material";

const Content = ({ text, variant, color }) => {
  return (
    <Typography
      color={color ? color : "white"}
      fontFamily={"Lato"}
      textAlign={"justify"}
      variant={variant ? variant : "h6"}
    >
      {text}
    </Typography>
  );
};

export default Content;
