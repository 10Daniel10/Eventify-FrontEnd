'use client';
import { useEffect, useState } from 'react';
import { CategoriesList } from 'eventapp/components/categories/CategoriesList';
import { Hero } from 'eventapp/components/home/Hero';
import { ServicesList } from 'eventapp/components/services/ServicesList';
import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { getCategories } from 'eventapp/services/categories/categories.service';
import { getServices } from 'eventapp/services/services/servicios.service';
import { ICategory, IService } from 'interfaces';
import { ProvidersList } from 'eventapp/components/providers/ProvidersList';
import { getProviders } from 'eventapp/services/providers/providers.service';

import s from './index.module.css';

const Home: NextPage = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {        
  //       const providersData = await getProviders();
  //       setProviders(providersData);
  //     } catch (error) {
  //       console.error('Error al obtener proveedores:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
        <Hero/>
        <CategoriesList listVariant='slider' title={{text: 'Categorías'}} categories={categories} className={s['categories-slider-container']} />
        {/* <ProvidersList listVariant='slider' title={{text: 'Proveedores'}} providers={providers}/> */}
        <ServicesList listVariant='slider' title={{text: 'Servicios'}} services={services} className={s['services-slider-container']}/>
      </Layout>
    </>
  )
}

export default Home;