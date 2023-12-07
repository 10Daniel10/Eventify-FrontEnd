import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts";

interface ChartCategoryProps {
  dataSetCategory: any[]; // Ajusta este tipo según la estructura de tus datos
}

const ChartCategory: React.FC<ChartCategoryProps> = ({ dataSetCategory }) => {
  console.log(dataSetCategory);

  return (
    <Box>
      <PieChart
        series={[
          {
            data: dataSetCategory,
          },
        ]}
        width={400}
        height={200}
      />
    </Box>
  );
};

export default ChartCategory;