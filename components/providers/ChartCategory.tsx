import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts";

interface ChartCategoryProps {
  dataSetCategory: any[]; // Ajusta este tipo según la estructura de tus datos
}

const ChartCategory: React.FC<ChartCategoryProps> = ({ dataSetCategory }) => {
  console.log(dataSetCategory);

  return (
    <PieChart
      series={[
        {
          data: dataSetCategory,
        },
      ]}
      height={200}
    />
  );
};

export default ChartCategory;