import { useEffect, useState } from 'react';
import { Layout } from 'eventapp/components/layout/Layout';
import { ProvidersList } from 'eventapp/components/providers/ProvidersList';
import { NextPage } from 'next';
import Head from 'next/head';
import { getProviders } from 'eventapp/services/providers/providers.service';
import { UserProviderI } from 'interfaces';

const Categories: NextPage = () => {
  const [providers, setProviders] = useState<UserProviderI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const providersData = await getProviders();
        setProviders(providersData);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    };
    fetchData();
  }, []);

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
      <Layout variant='navigation'>
        <ProvidersList listVariant='grid' title={{text: 'Proveedores'}} providers={providers}/>
      </Layout>
    </>
  )
}

export default Categories;