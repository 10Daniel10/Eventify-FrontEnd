import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts";

// @ts-ignore
const ChartCategory = ( {dataSetCategory}  ) => {

  
  console.log(dataSetCategory)

  return (
        <Box>                        
            <PieChart
            series={[
              {
                data:dataSetCategory,
              },
            ]}
            width={400}
            height={200}
          />
                  </Box>        
          
  )
}

export default ChartCategory;