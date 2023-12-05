'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getProviderServices } from 'eventapp/services/providers/providers.service';
import { IService, IServiceProvider } from 'interfaces';
import { Layout } from 'eventapp/components/layout/Layout';
import { ProviderServices } from 'eventapp/components/providers/ProviderServices';

const ProviderServicesPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const providerId = Number(id);

  const [services, setServices] = useState<(IService & IServiceProvider)[]>([]);
  const [emptyState, setEmptyState] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(providerId){
          const servicesData = await getProviderServices(providerId);
          setServices(servicesData);
          setEmptyState(false);
        } else{
          setEmptyState(true);
        }
      } catch (error) {
        setEmptyState(true);
        console.error('Error al obtener servicios:', error);
      }
    };
    fetchData();
  }, [providerId]);

  return (
    <>
      <Head>
        <title>Eventify | Servicios por proveedor</title>
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
        <ProviderServices services={services} emptyState={emptyState}/>
      </Layout>
    </>
  )
}

export default ProviderServicesPage;