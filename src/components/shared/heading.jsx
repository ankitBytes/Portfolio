import { Typography } from "@mui/material";
import PropTypes from "prop-types"

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
      {text}
    </Typography>
  );
};

Heading.prototype = {
  text: PropTypes.string.isRequired,
  align: PropTypes.string,
}

export default Heading;
