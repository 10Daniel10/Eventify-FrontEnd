import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

interface ChartMonthProps {
  dataSet: any[]; // Ajusta este tipo según la estructura de tus datos
}

const ChartMonth: React.FC<ChartMonthProps> = ({ dataSet }) => {
  const valueFormatter = (value: number) => `${value}mm`;

  const chartSetting = {
    xAxis: [
      {
        label: 'Pesos',
      },
    ],
    width: 500,
    height: 400,
  };

  return (
    <Box>
      {dataSet && (
        <BarChart
          dataset={dataSet}
          yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[{ dataKey: 'Catering', valueFormatter }]}
          layout="horizontal"
          {...chartSetting}
        />
      )}
    </Box>
  );
};

export default ChartMonth;