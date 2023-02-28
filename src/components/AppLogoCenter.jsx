import React from "react";
import Image from "mui-image";
import {Box} from "@mui/material";

const AppLogoCenter = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Image
                src="/src/assets/images/app_logo.png"
                width={300}
                height={300}
                duration={0}
            />
        </Box>
    );
}

export default AppLogoCenter;
