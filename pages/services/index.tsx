'use client';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IService } from 'interfaces';
import { getServices, getServicesByProvider } from 'eventapp/services/services/servicios.service';
import { Layout } from 'eventapp/components/layout/Layout';
import { ServicesList } from 'eventapp/components/services/ServicesList';
import s from '../index.module.css';

const Services: NextPage = () => {
  const router = useRouter();
  const { providerId } = router.query;
  const id = Number(providerId);

  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(id){
          const servicesData = await getServicesByProvider(id);
          setServices(servicesData);
        } else{
          const servicesData = await getServices();
          setServices(servicesData);
        }
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Head>
        <title>Eventify | Servicios</title>
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
        <ServicesList listVariant='grid' title={{text: 'Servicios'}} services={services} className={s['page-container']}/>
      </Layout>
    </>
  )
}

export default Services;