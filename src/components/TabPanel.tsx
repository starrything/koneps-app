import React from "react";
import {Box} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    name: string;
    index:number;
    value:number;
}

const TabPanel = (props:TabPanelProps) => {
    const { children, name, value, index, ...other } = props;
    return(
       <div
           role={`${name}panel`}
           hidden={value !== index}
           id={`${name}panel-${index}`}
           aria-labelledby={`${name}-${index}`}
           {...other}
       >
       {value === index && (
           <Box sx={{ p: 1 }}>
               {children}
           </Box>
       )}
       </div>
   )
}

export default TabPanel;
