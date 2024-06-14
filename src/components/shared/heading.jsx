import { Typography } from "@mui/material";

const Heading = ({ text, align }) => {
  return (
    <Typography
      textAlign={align ? align : "center"}
      fontFamily={"Syncopate"}
      variant="h2"
      textTransform={"uppercase"}
      fontWeight={600}
      color={"#A020F0"}
    >
      {text} -&gt;
    </Typography>
  );
};

export default Heading;
