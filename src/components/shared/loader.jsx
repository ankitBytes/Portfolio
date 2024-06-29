import { Box } from "@mui/material";
import "../../App.css"

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '95vh', overflow: 'hidden'}}>
      <div className="loading-container">
        <div className="loading-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </Box>
  );
};

export default Loader;
