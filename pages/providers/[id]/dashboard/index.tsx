import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Layout } from 'eventapp/components/layout/Layout';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { calculateTotalSum, generateChartDataByCategory, processesData } from 'utils/forCharts';
import { Box } from '@mui/material';
import ChartMonth from 'eventapp/components/providers/ChartMonth';
import ChartTotal from 'eventapp/components/providers/ChartTotal';
import ChartCategory from 'eventapp/components/providers/ChartCategory';
import { getDataForChart } from 'eventapp/services/charts/chart.data.service';
import { ProvidersTable } from 'eventapp/components/providers/ProvidersTable';
import { useRouter } from 'next/router';
import "dayjs/locale/es";

const ProvidersDashboard: NextPage = () => {
  const router = useRouter();
  const { id: idProvider } = router.query;

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
        if (idProvider) {
          const dataChart = await getDataForChart(`${idProvider}`);
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
    fetchData();
  }, [idProvider, router.query]);

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

  return (
    <>
      <Head>
        <title>Eventify | Proveedores</title>
        <meta property='og:title' content='Eventify' key='title'></meta>
        <meta
          name='description'
          content='Planifica tu evento de forma sencilla y eficaz'
        />
        <meta charSet='utf-8' />
        <meta name='evento, app de eventos, organización de eventos, organización' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Box>
          <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Desde"
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
              format="YYYY-MM-DD"
            />
            <DatePicker
              label="Hasta"
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
              format="YYYY-MM-DD"
            />
          </LocalizationProvider>
          <button onClick={handleFilter}>Filtrar</button>
        </Box>

        {datos && dataSetCategory && dataSet && (
          <>
            <ChartMonth dataSet={dataSet} />
            <ChartTotal total={total} />
            <ChartCategory dataSetCategory={dataSetCategory} />
            <ProvidersTable reservations={filteredEventsSet} />
          </>
        )}
      </Layout>
    </>
  );
};

export default ProvidersDashboard;