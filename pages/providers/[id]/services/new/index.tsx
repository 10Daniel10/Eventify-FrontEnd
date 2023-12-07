import { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from 'eventapp/components/layout/Layout';
import { NewServiceForm } from 'eventapp/components/services/NewServiceForm';
import { Section } from 'eventapp/components/layout/Section';

const NewService: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eventify | Agregar servicio</title>
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
        <Section>
          <NewServiceForm />
        </Section>
      </Layout>
    </>
  )
}

export default NewService;