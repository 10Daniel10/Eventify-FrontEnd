import { CartTable } from 'eventapp/components/cart/CartTable';
import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import Head from 'next/head';

const reservations = {
  '2023-11-20': {
    user_id: 10,
    starDatetime: '2023-11-20',
    products: [ { id: 71 } ]
  },
  '2023-12-11': {
    user_id: 10,
    starDatetime: '2023-12-11',
    products: [
      { id: 2 },
      { id: 5 },
      { id: 6 },
      { id: 7 }
    ]
  },
  '2023-12-13': {
    user_id: 10,
    starDatetime: '2023-12-13',
    products: [ { id: 2 }, { id: 1 } ]
  },
  '2023-12-14': {
    user_id: 10,
    starDatetime: '2023-12-14',
    products: [ { id: 2 } ]
  },
  '2023-12-20': {
    user_id: 10,
    starDatetime: '2023-12-20',
    products: [ { id: 71 }, { id: 74 } ]
  },
  '2023-12-21': {
    user_id: 10,
    starDatetime: '2023-12-21',
    products: [ { id: 71 } ]
  }
}

const Reservations: NextPage = () => {
  const reserv = Object.values(reservations);
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
        <CartTable reservations={reserv} />
      </Layout>
    </>
  )
}

export default Reservations;