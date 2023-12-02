import { Box } from '@mui/material';
import { Layout } from 'eventapp/components/layout/Layout';
import { Section } from 'eventapp/components/layout/Section';
import { ReservationsTable } from 'eventapp/components/reservations/ReservationTable';
import { getHistorialReservations } from 'eventapp/services/reservations/reservations.service';
import { getIdUser } from 'eventapp/services/users/users.service';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Reservations: NextPage = () => {
  const userId = getIdUser();  
  const [reservations, setReservations] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const reservationsData = await getHistorialReservations(userId);
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error al obtener reservaciones:', error);
      }
    };
    fetchData();
  }, [userId]);
    

  return (
    <>
      <Head>
        <title>Eventify | Historial de reservas</title>
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
        {(reservations !== null && reservations !== undefined) ? (
          <ReservationsTable reservations={reservations} />
        ) : (
          <Section>
          <Box>
            <p>No hay reservas</p>
          </Box>
          </Section>
        )}              
      </Layout>
    </>
  )
}

export default Reservations;