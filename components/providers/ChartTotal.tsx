import React from "react";
import { Box } from "@mui/material";

interface ChartTotalProps {
  total: number;
}

const ChartTotal: React.FC<ChartTotalProps> = ({ total }) => {
  return (
    <Box>
      <p>Total en pesos: $ {total}</p>
    </Box>
  );
};

export default ChartTotal;