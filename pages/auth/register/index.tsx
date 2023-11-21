import { RegisterForm } from 'eventapp/components/auth/RegisterForm';
import { Layout } from 'eventapp/components/layout/Layout';
import { Section } from 'eventapp/components/layout/Section';
import { NextPage } from 'next';
import Head from 'next/head';

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eventify | Registro</title>
        <meta property='og:title' content='Eventify' key='title'></meta>
        <meta
          name='description'
          content='Regístrate y organiza tu evento'
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
          <RegisterForm/>
        </Section>
      </Layout>
    </>
  )
}

export default Register;