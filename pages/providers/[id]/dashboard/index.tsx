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




const datos = [
  {
      "userId": 41,
      "startDateTime": "2023-10-08T00:00:00",
      "endDateTime": "2023-10-08T00:00:00",
      "products": [
        {
          "id": 7,
          "name": "Mesa de canapés",
          "price": 10,
          "shortDescription": "Degusta una selección exquisita de canapés artesanales para tus eventos. Sabores únicos en cada bocado, presentados con elegancia y estilo.",
          "description": "Nuestra Mesa de Canapés es perfecta para cualquier ocasión especial. Desde eventos corporativos hasta celebraciones íntimas, ofrecemos una variedad de deliciosos canapés preparados con ingredientes frescos y de alta calidad. Disfruta de una experiencia gastronómica única con nuestros exquisitos sabores y presentación impecable.",
          "location": "asd",
          "category": {
            "id": 5,
            "name": "Cena"
          },
          "provider": {
            "id": 12,
            "name": "Catering La Claudia",
            "imageUrl": "https://eventify-bucket.s3.amazonaws.com/252597.JPEG"
          },
          "bookedDates": null,
          "imageUrls": []
        }
      ]
    },
  {
      "userId": 41,
      "startDateTime": "2023-10-08T00:00:00",
      "endDateTime": "2023-10-08T00:00:00",
      "products": [
        {
          "id": 7,
          "name": "Mesa de canapés",
          "price": 10,
          "shortDescription": "Degusta una selección exquisita de canapés artesanales para tus eventos. Sabores únicos en cada bocado, presentados con elegancia y estilo.",
          "description": "Nuestra Mesa de Canapés es perfecta para cualquier ocasión especial. Desde eventos corporativos hasta celebraciones íntimas, ofrecemos una variedad de deliciosos canapés preparados con ingredientes frescos y de alta calidad. Disfruta de una experiencia gastronómica única con nuestros exquisitos sabores y presentación impecable.",
          "location": "asd",
          "category": {
            "id": 5,
            "name": "Catering"
          },
          "provider": {
            "id": 12,
            "name": "Catering La Claudia",
            "imageUrl": "https://eventify-bucket.s3.amazonaws.com/252597.JPEG"
          },
          "bookedDates": null,
          "imageUrls": []
        }
      ]
    },
  {
    "userId": 41,
    "startDateTime": "2023-12-08T00:00:00",
    "endDateTime": "2023-12-08T00:00:00",
    "products": [
      {
        "id": 7,
        "name": "Mesa de canapés",
        "price": 10,
        "shortDescription": "Degusta una selección exquisita de canapés artesanales para tus eventos. Sabores únicos en cada bocado, presentados con elegancia y estilo.",
        "description": "Nuestra Mesa de Canapés es perfecta para cualquier ocasión especial. Desde eventos corporativos hasta celebraciones íntimas, ofrecemos una variedad de deliciosos canapés preparados con ingredientes frescos y de alta calidad. Disfruta de una experiencia gastronómica única con nuestros exquisitos sabores y presentación impecable.",
        "location": "asd",
        "category": {
          "id": 5,
          "name": "Catering"
        },
        "provider": {
          "id": 12,
          "name": "Catering La Claudia",
          "imageUrl": "https://eventify-bucket.s3.amazonaws.com/252597.JPEG"
        },
        "bookedDates": null,
        "imageUrls": []
      }
    ]
  },
  {
    "userId": 41,
    "startDateTime": "2023-12-09T00:00:00",
    "endDateTime": "2023-12-09T00:00:00",
    "products": [
      {
        "id": 7,
        "name": "Mesa de canapés",
        "price": 15,
        "shortDescription": "Degusta una selección exquisita de canapés artesanales para tus eventos. Sabores únicos en cada bocado, presentados con elegancia y estilo.",
        "description": "Nuestra Mesa de Canapés es perfecta para cualquier ocasión especial. Desde eventos corporativos hasta celebraciones íntimas, ofrecemos una variedad de deliciosos canapés preparados con ingredientes frescos y de alta calidad. Disfruta de una experiencia gastronómica única con nuestros exquisitos sabores y presentación impecable.",
        "location": "asd",
        "category": {
          "id": 5,
          "name": "Catering"
        },
        "provider": {
          "id": 12,
          "name": "Catering La Claudia",
          "imageUrl": "https://eventify-bucket.s3.amazonaws.com/252597.JPEG"
        },
        "bookedDates": null,
        "imageUrls": []
      }
    ]
  },
  {
    "userId": 41,
    "startDateTime": "2022-12-09T00:00:00",
    "endDateTime": "2022-12-09T00:00:00",
    "products": [
      {
        "id": 7,
        "name": "Mesa de canapés",
        "price": 200,
        "shortDescription": "Degusta una selección exquisita de canapés artesanales para tus eventos. Sabores únicos en cada bocado, presentados con elegancia y estilo.",
        "description": "Nuestra Mesa de Canapés es perfecta para cualquier ocasión especial. Desde eventos corporativos hasta celebraciones íntimas, ofrecemos una variedad de deliciosos canapés preparados con ingredientes frescos y de alta calidad. Disfruta de una experiencia gastronómica única con nuestros exquisitos sabores y presentación impecable.",
        "location": "asd",
        "category": {
          "id": 5,
          "name": "Catering"
        },
        "provider": {
          "id": 12,
          "name": "Catering La Claudia",
          "imageUrl": "https://eventify-bucket.s3.amazonaws.com/252597.JPEG"
        },
        "bookedDates": null,
        "imageUrls": []
      }
    ]
  }
  ,
  {
    "userId": 41,
    "startDateTime": "2022-11-09T00:00:00",
    "endDateTime": "2022-11-09T00:00:00",
    "products": [
      {
        "id": 7,
        "name": "Mesa de canapés",
        "price": 250,
        "shortDescription": "Degusta una selección exquisita de canapés artesanales para tus eventos. Sabores únicos en cada bocado, presentados con elegancia y estilo.",
        "description": "Nuestra Mesa de Canapés es perfecta para cualquier ocasión especial. Desde eventos corporativos hasta celebraciones íntimas, ofrecemos una variedad de deliciosos canapés preparados con ingredientes frescos y de alta calidad. Disfruta de una experiencia gastronómica única con nuestros exquisitos sabores y presentación impecable.",
        "location": "asd",
        "category": {
          "id": 5,
          "name": "Catering"
        },
        "provider": {
          "id": 12,
          "name": "Catering La Claudia",
          "imageUrl": "https://eventify-bucket.s3.amazonaws.com/252597.JPEG"
        },
        "bookedDates": null,
        "imageUrls": []
      }
    ]
  }
]


const ProvidersDashboard: NextPage = () => {
  
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs('2023-04-17'));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs('2023-12-17'));
  
  const [dataSet, setDataSet] = useState();
  const [dataSetCategory, setDataSetCategory] = useState();
  const [total, setTotal] = useState(0);
  const [datos, setDatos] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {        
        const dataChart = await getDataForChart("12");        
        setDatos(dataChart);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    };
    fetchData();
  }, []);

  function handleFilter(){
        
      const filteredEvents = datos.filter(event => {
          const eventDate = dayjs(event.startDateTime);
          return eventDate.isAfter(dayjs(dateFrom)) && eventDate.isBefore(dayjs(dateTo));
      });
              
      const valuesChart = processesData(filteredEvents);            
      setDataSet(valuesChart);        
      setTotal(calculateTotalSum(valuesChart));  
      setDataSetCategory(generateChartDataByCategory(filteredEvents))       
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
        <br />
        <Box>
        <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
                
                <DatePicker
                    label="Controlled picker"
                    value={dateFrom}
                    onChange={(newValue) => setDateFrom(newValue)}
                    format="YYYY-MM-DD"
                />
                <DatePicker
                    label="Controlled picker"
                    value={dateTo}
                    onChange={(newValue) => setDateTo(newValue)}
                    format="YYYY-MM-DD"
                />
            
        </LocalizationProvider>
        <button onClick={handleFilter}>asdasdasdasd</button>
        </Box>

{datos && dataSetCategory &&
        <>
          <ChartMonth dataSet={dataSet} />
          <ChartTotal total={total} />
          <ChartCategory dataSetCategory={dataSetCategory} />
          <ProvidersTable reservations={datos} />
        </>
}
        
        


      </Layout>
    </>
  )
}

export default ProvidersDashboard;