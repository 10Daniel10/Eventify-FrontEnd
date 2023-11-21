import { Layout } from 'eventapp/components/layout/Layout';
import { NextPage } from 'next';
import Head from 'next/head';

const UserId: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eventify | Clientes</title>
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
        <h1>Aquí va el formulario del perfil del usuario</h1>
      </Layout>
    </>
  )
}

export default UserId;