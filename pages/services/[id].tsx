'use client';
import { useEffect, useState } from 'react';
import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { getServiceById } from 'eventapp/services/services/servicios.service';
import { useRouter } from 'next/router';
import { ServicesCard } from 'eventapp/components/services/ServicesCard';
import { IService } from 'interfaces';

const Service: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [service, setService] = useState<IService | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const serviceData = await getServiceById(id);
        setService(serviceData);
      } catch (error) {
        console.error('Error al obtener servicio:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Head>
        <title>Eventify</title>
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
      <Layout variant='navigation'>
        <ServicesCard service={service} />
      </Layout>
    </>
  )
}

export default Service;