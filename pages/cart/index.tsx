import { CartTable } from 'eventapp/components/cart/CartTable';
import { Layout } from 'eventapp/components/layout/Layout';
import { getReservations } from 'eventapp/services/cart/cart.services';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Cart: NextPage = () => {

  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const reservationsData = await getReservations();             
        if (reservationsData !== undefined)
          setReservations(reservationsData);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    }; 
    fetchData();
  }, []);
  

  return (
    <>
      <Head>
        <title>Eventify | Reservas por realizar</title>
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
      {reservations !== null ? (
        <CartTable reservations={reservations} />
      ) : (
        <p>No hay reservas</p>
      )}        
        
      </Layout>
    </>
  )
}

export default Cart;