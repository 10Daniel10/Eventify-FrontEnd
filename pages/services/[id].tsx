'use client';
import { useEffect, useState } from 'react';
import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { getServiceById, getServiceFeatures } from 'eventapp/services/services/servicios.service';
import { useRouter } from 'next/router';
import { IService, IServiceProvider } from 'interfaces';
import { ServicesDetail, TFeature } from 'eventapp/components/services/ServicesDetail';

const Service: NextPage = () => {
  const router = useRouter();
  let { id } = router.query;
  const serviceId = id ? parseInt(id as string, 10) : 0;
    
  const [service, setService] = useState<(IService & IServiceProvider) | null>(null);
  const [serviceFeatures, setServiceFeatures] = useState<TFeature[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await getServiceById(serviceId);
        setService(serviceData);
        const featuresData = await getServiceFeatures(serviceId);
        setServiceFeatures(featuresData);
      } catch (error) {
        console.error('Error al obtener servicio:', error);
      }
    };
    fetchData();
  }, [serviceId]);

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
      <Layout>
      {service !== null ? (
        <ServicesDetail service={service} features={serviceFeatures}/>
      ) : (
        <p>Cargando servicio...</p>
      )}
      </Layout>
    </>
  )
}

export default Service;