import { CartTable } from 'eventapp/components/cart/CartTable';
import { Layout } from 'eventapp/components/layout/Layout';
import { getReservations } from 'eventapp/services/cart/cart.services';
import { IReservation } from 'interfaces';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Reservations: NextPage = () => {

  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const reservationsData = await getReservations();
        //setReservations(reservationsData);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchData();
  }, []);


  //const reserv = Object.values(reservations);
  return (
    <>
      <Head>
        <title>Eventify | Mis reservas</title>
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
        {/* <CartTable reservations={reserv} /> */}
      </Layout>
    </>
  )
}

export default Reservations;