import { useEffect, useState } from 'react';
import { CategoriesList } from 'eventapp/components/categories/CategoriesList';
import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import { CategoryT } from 'types/categories/Category.types';
import { getCategories } from 'eventapp/services/categories/categories.service';

const Categories: NextPage = () => {
  const [categories, setCategories] = useState<CategoryT[]>([]);

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
        <title>Eventify | Categorías</title>
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
        <CategoriesList listVariant='grid' title={{text: 'Categorías'}} categories={categories}/>
      </Layout>
    </>
  )
}

export default Categories;