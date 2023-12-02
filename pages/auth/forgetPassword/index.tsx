import { ForgetPasswordForm } from 'eventapp/components/auth/ForgetPasswordForm';
import { Layout } from 'eventapp/components/layout/Layout';
import { Section } from 'eventapp/components/layout/Section';
import { NextPage } from 'next';
import Head from 'next/head';

const ForgetPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eventify | Recuperar contraseña</title>
        <meta property='og:title' content='Eventify' key='title'></meta>
        <meta
          name='description'
          content='Ingresa tu correo para restablecer tu contraseña.'
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
          <ForgetPasswordForm />
        </Section>
      </Layout>
    </>
  )
}

export default ForgetPasswordPage;