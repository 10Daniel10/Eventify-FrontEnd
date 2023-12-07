'use client';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IService, IServiceProvider } from 'interfaces';
import { getServices, getServicesByCategory, getServicesByProvider } from 'eventapp/services/services/servicios.service';
import { Layout } from 'eventapp/components/layout/Layout';
import { ServicesList } from 'eventapp/components/services/ServicesList';
import s from '../index.module.css';

const Services: NextPage = () => {
  const router = useRouter();
  const { providerId } = router.query;
  const { categoryId } = router.query;

  const [byProvider, setByProvider] = useState<boolean>(false);
  const [byCategory, setByCategory] = useState<boolean>(false);

  useEffect(() => {
    if(providerId){
      setByProvider(true);
    }
    if(categoryId){
      setByCategory(true);
    }
  }, [providerId, categoryId])

  const [services, setServices] = useState<(IService & IServiceProvider)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if(providerId){
        try{
          const servicesData = await getServicesByProvider(`${providerId}`);
          setServices(servicesData);
        } catch (error){
          setServices([]);
          console.error('Error al obtener servicios por proveedor:', error);
        }
      } else if(categoryId){
        try{
          const servicesData = await getServicesByCategory(`${categoryId}`);
          setServices(servicesData);
        } catch (error){
          setServices([]);
          console.error('Error al obtener servicios por categoría:', error);
        }
      } else {
        try{
          const servicesData = await getServices();
          setServices(servicesData);
        } catch (error){
          setServices([]);
          console.error('Error al obtener servicios por categoría:', error);
        }
      }
    };
    fetchData();
  }, [providerId, categoryId]);

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