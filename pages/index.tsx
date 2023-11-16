import { useEffect, useState } from 'react';
import { CategoriesList } from 'eventapp/components/categories/CategoriesList';
import { Hero } from 'eventapp/components/home/Hero';
import { ServicesList } from 'eventapp/components/services/ServicesList';
import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { CategoryT } from 'types/categories/Category.types';
import { getCategories } from 'eventapp/services/categories/categories.service';
import { getServices } from 'eventapp/services/services/servicios.service';

const Home: NextPage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState<CategoryT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
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
        console.error('Error al obtener proveedores:', error);
      }
    };
    fetchData();
  }, []);

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
        <Hero/>        
        <CategoriesList listVariant='slider' title={{text: 'Categorías'}} categories={categories}/>
        <ServicesList listVariant='slider' title={{text: 'Servicios'}} services={services}/>
      </Layout>
    </>
  )
}

export default Home;