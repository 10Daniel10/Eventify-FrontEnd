import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import s from '../../styles/providers/ProvidersDashboard.module.css';

type DataSet = {
  month: string;
  value: number;
}
interface ChartMonthProps {
  dataSet: DataSet[]; // Ajusta este tipo según la estructura de tus datos
}

const ChartMonth: React.FC<ChartMonthProps> = ({ dataSet }) => {
  const valueFormatter = (value: number) => `${value}mm`;

  const chartSetting = {
    xAxis: [
      {
        label: 'Pesos',
      },
    ],
    height: 400,
  };

  return (
    dataSet && (
      <BarChart
        dataset={dataSet}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'Catering', valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
      />
    )
  );
};

export default ChartMonth;