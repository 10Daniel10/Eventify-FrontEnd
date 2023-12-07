import { BarChart } from "@mui/x-charts";

type DataSet = {
  month: string;
  value: number;
}
interface ChartMonthProps {
  dataSet: DataSet[]; // Ajusta este tipo según la estructura de tus datos
}

const ChartMonth: React.FC<ChartMonthProps> = ({ dataSet }) => {
  console.log({dataSet});
  const valueFormatter = (value: number) => `$ ${value}`;

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
        series={[{ dataKey: 'Iluminación', valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
      />
    )
  );
};

export default ChartMonth;