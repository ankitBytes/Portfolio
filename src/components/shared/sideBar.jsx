import { Box, Stack } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fontSize } from "@mui/system";

const SideBar = ({direction}) => {

    const Icon = {
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in',
        fontSize: '1.4rem',

        "&:hover": {
            color: '#bbff00'
        }
    }

    return (
        <Box>
            <Stack spacing={4} direction={direction}>
                <GitHubIcon sx={Icon} />
                <XIcon sx={Icon} />
                <LinkedInIcon sx={Icon} />
            </Stack>
        </Box>
    )
}

export default SideBar;