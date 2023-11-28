import { useEffect, useState } from 'react';
import { Layout } from 'eventapp/components/layout/Layout';
import { ServicesList } from 'eventapp/components/services/ServicesList';
import { NextPage } from 'next';
import Head from 'next/head';
import { IService } from 'interfaces';
import { getServices } from 'eventapp/services/services/servicios.service';
import { ProviderServices } from 'eventapp/components/services/ProviderServices';

const services = [
  {
    id: 1,
    name: 'María',
    short_description: 'Hola María',
    description: 'OK',
    characteristics: [],
    category: {
      id: 1,
      name: 'Catering'
    }, // TODO: acá después hay que reemplazarlo por el type
    provider: {
      id: 1,
      name: 'José'
    }, // TODO: acá después hay que reemplazarlo por el type
    images: [],
    place: 'Mendoza, Argentina',
    price: 500.00,
    available_dates: []
  },
  {
    id: 1,
    name: 'María',
    short_description: 'Hola María',
    description: 'OK',
    characteristics: [],
    category: {
      id: 1,
      name: 'Catering'
    }, // TODO: acá después hay que reemplazarlo por el type
    provider: {
      id: 1,
      name: 'José'
    }, // TODO: acá después hay que reemplazarlo por el type
    images: [],
    place: 'Mendoza, Argentina',
    price: 500.00,
    available_dates: []
  },
  {
    id: 1,
    name: 'María',
    short_description: 'Hola María',
    description: 'OK',
    characteristics: [],
    category: {
      id: 1,
      name: 'Catering'
    }, // TODO: acá después hay que reemplazarlo por el type
    provider: {
      id: 1,
      name: 'José'
    }, // TODO: acá después hay que reemplazarlo por el type
    images: [],
    place: 'Mendoza, Argentina',
    price: 500.00,
    available_dates: []
  }
]

const ProviderServicesPage: NextPage = () => {
  // const [services, setServices] = useState<IService[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {        
  //       const servicesData = await getServices();
  //       setServices(servicesData);
  //     } catch (error) {
  //       console.error('Error al obtener servicios:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Head>
        <title>Eventify | Mis servicios</title>
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
        <ProviderServices services={services} />
      </Layout>
    </>
  )
}

export default ProviderServicesPage;