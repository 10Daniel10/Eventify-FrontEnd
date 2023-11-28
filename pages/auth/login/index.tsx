import { LoginForm } from 'eventapp/components/auth/LoginForm';
import { HeadCustom } from 'eventapp/components/layout/HeadCustom';
import { Layout } from 'eventapp/components/layout/Layout';
import { Section } from 'eventapp/components/layout/Section';
import { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <>
      <HeadCustom title="Iniciar sesión" />    
      <Layout variant='navigation'>
        <Section variant='contained'>
          <LoginForm/>
        </Section>
      </Layout>
    </>
  )
}

export default Login;