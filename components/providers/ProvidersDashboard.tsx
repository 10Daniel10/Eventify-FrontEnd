import { NextPage } from 'next';
import { useEffect, useState, FC } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { calculateTotalSum, generateChartDataByCategory, processesData } from 'utils/forCharts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChartMonth from 'eventapp/components/providers/ChartMonth';
import ChartTotal from 'eventapp/components/providers/ChartTotal';
import ChartCategory from 'eventapp/components/providers/ChartCategory';
import { getDataForChart } from 'eventapp/services/charts/chart.data.service';
import { ProvidersTable } from 'eventapp/components/providers/ProvidersTable';
import { useRouter } from 'next/router';
import "dayjs/locale/es";
import { Section } from '../layout/Section';
import { Loader } from '../loader/Loader';
import { CustomTitle } from '../layout/CustomTitle';
import { CustomButton } from '../form/CustomButton';
import s from '../../styles/providers/ProvidersDashboard.module.css';
import { Typography } from '@mui/material';
import { getReports } from 'eventapp/services/providers/providers.service';

const ProvidersDashboard: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs('2023-12-01'));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs('2023-12-17'));
  const [dataSet, setDataSet] = useState<any>();
  const [dataSetCategory, setDataSetCategory] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const [datos, setDatos] = useState<any[]>([]);
  const [filteredEventsSet, setfilteredEventsSet] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const dataChart = await getDataForChart(`${id}`);
          if (Array.isArray(dataChart)) {
            setDatos(dataChart);
          } else {
            console.error('getDataForChart no devolvió un array:', dataChart);
          }
        } else {
          console.error('La propiedad id no está definida en router.query:', router.query);
        }
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    };
    if(id){
      fetchData();
    }
  }, [id, router.query]);

  function handleFilter() {
    if (Array.isArray(datos) && datos.length > 0) {
      const filteredEvents = datos.filter((event: any) => {
        const eventDate = dayjs(event.startDateTime);
        return eventDate.isAfter(dayjs(dateFrom)) && eventDate.isBefore(dayjs(dateTo));
      });

      if (filteredEvents.length === 0) {
        setDataSet(undefined);
        setTotal(0);
        setDataSetCategory([]);
      }

      if (Array.isArray(filteredEvents) && filteredEvents.length > 0) {
        setfilteredEventsSet(filteredEvents);
        const valuesChart = processesData(filteredEvents);
        setDataSet(valuesChart);
        setTotal(Number(calculateTotalSum(valuesChart)));
        setDataSetCategory(generateChartDataByCategory(filteredEvents));
      }
    }
  }

  const downloadPDF = async () => {
    try{
      if(id){
        const formattedDateFrom = dayjs(dateFrom).format('YYYY-MM-DD');
        const formattedDateTo = dayjs(dateTo).format('YYYY-MM-DD');
        const pdf = await getReports(`${id}`, `${formattedDateFrom}`, `${formattedDateTo}`);

        window.open(pdf.url, '_blank');

      }
    } catch (error) {
      console.error('Error al obtener reporte:', error);
    }
  };

  return (
    <Section className={s.container}>
      <CustomTitle color={'primary'} htmlTag={'h1'} text={'Dashboard'}/>
      <CustomTitle color={'gray'} htmlTag={'h4'} text={'Selecciona un rango de fechas para generar reportes'} className={s.description}/>
      {id ? (
        <>
          <Box className={s['filter-box']}>
            <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde"
                value={dateFrom}
                onChange={(newValue) => setDateFrom(newValue)}
                format="YYYY-MM-DD"
                className={s.datepicker}
              />
              <DatePicker
                label="Hasta"
                value={dateTo}
                onChange={(newValue) => setDateTo(newValue)}
                format="YYYY-MM-DD"
                className={s.datepicker}
              />
            </LocalizationProvider>
            <CustomButton variant={'contained'} customColor={'primary'} onClick={handleFilter}>Filtrar</CustomButton>
            {datos && dataSetCategory && dataSet && <CustomButton variant={'contained'} customColor={'secondary'}onClick={downloadPDF}>Descargar PDF</CustomButton>}
          </Box>
          {datos && dataSetCategory && dataSet && (
            <>
              <Grid container spacing={2} mt={4} mb={4}>
                <Grid item xs={12} sm={6} className={s.total_chart}>
                  <Typography>Total ganado en pesos:</Typography>
                  <CustomTitle color={'secondary'} htmlTag={'h3'} text={`$ ${total}`}/>
                  <ChartCategory dataSetCategory={dataSetCategory} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ChartMonth dataSet={dataSet} />
                </Grid>
                <Grid item xs={12}>
                  <ProvidersTable reservations={filteredEventsSet} />
                </Grid>
              </Grid>
             </>
          )}
        </>
      ) : (
        <Loader/>
      )}
    </Section>
  );
};

export default ProvidersDashboard;